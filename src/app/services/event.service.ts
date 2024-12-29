import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DialogueService } from './dialogue.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = environment.firebaseDatabaseURL;
  private eventsEndpoint = `${this.baseUrl}/events`;
  private usersEndpoint = `${this.baseUrl}/users`;

  activeUser: User;

  eventTypes: string[] = [
    'Business & Professional',
    'Entertainment & Leisure',
    'Technology',
    'Food & Drink',
    'Arts & Culture',
    'Others',
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private dialogueService: DialogueService
  ) {}

  addNewEvent(event: Event): Observable<void> {
    event.expired = false;
    const url = `${this.eventsEndpoint}/${event.id}.json`;
    return this.http.put<void>(url, event).pipe(
      tap(
        () => {
          console.log('Event added:', event);
          this.dialogueService.showDialogue('eventCreated');
        },
        (error) => {
          console.error('Error adding event:', error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  getEventByID(id: string): Observable<Event> {
    const url = `${this.eventsEndpoint}/${id}.json`;
    return this.http.get<Event>(url).pipe(
      map((event) => {
        if (event) {
          this.checkAndMarkExpired(event);
          event['isRegistered'] = this.isUserRegisteredForEvent(id);
        }
        return event;
      })
    );
  }

  getAllEvents(): Observable<Event[]> {
    const url = `${this.eventsEndpoint}.json`;
    return this.http.get<{ [key: string]: Event }>(url).pipe(
      map((response) => {
        const events: Event[] = Object.values(response || {});
        events.forEach((event) => {
          this.checkAndMarkExpired(event);
          event['isRegistered'] = this.isUserRegisteredForEvent(event.id);
        });
        return events;
      })
    );
  }

  registerForEvent(eventId: string): Observable<boolean> {
    this.activeUser = this.authService.getActiveUser();

    if (this.activeUser) {
      const alreadyRegisteredEvent = this.activeUser.regEvents?.find(
        (event) => event.id === eventId
      );

      if (alreadyRegisteredEvent) {
        this.dialogueService.showDialogue('eventAlreadyRegistered');
        return of(false);
      }

      return this.getEventByID(eventId).pipe(
        map((event) => {
          if (event) {
            if (!this.activeUser.regEvents) {
              this.activeUser.regEvents = [];
            }
            this.activeUser.regEvents.push(event);

            const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
            this.http.put(userUrl, this.activeUser.regEvents).subscribe();
            this.dialogueService.showDialogue('eventRegistered');
            return true;
          }
          return false;
        })
      );
    } else {
      this.dialogueService.showDialogue('permissionDenied');
      return of(false);
    }
  }

  getRegisteredEvents(): Observable<Event[]> {
    this.activeUser = this.authService.getActiveUser();
    if (!this.activeUser || !this.activeUser.regEvents) {
      return of([]);
    }
    return of(this.activeUser.regEvents);
  }

  private checkAndMarkExpired(event: Event): void {
    const eventDate = new Date(event.doe);
    const currentDate = new Date();
    event.expired = eventDate < currentDate;
  }

  unRegisterEvent(eventId: string): Observable<boolean> {
    this.activeUser = this.authService.getActiveUser();

    if (this.activeUser && this.activeUser.regEvents) {
      const eventIndex = this.activeUser.regEvents.findIndex(
        (event) => event.id === eventId
      );

      if (eventIndex !== -1) {
        this.activeUser.regEvents.splice(eventIndex, 1);
        const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
        this.http.put(userUrl, this.activeUser.regEvents).subscribe();
        this.dialogueService.showDialogue('eventUnregistered');
        return of(true);
      } else {
        this.dialogueService.showDialogue('eventAlreadyUnregistered');
        return of(false);
      }
    } else {
      this.dialogueService.showDialogue('permissionDenied');
      return of(false);
    }
  }

  deleteEvent(id: string): Observable<void> {
    const url = `${this.eventsEndpoint}/${id}.json`;
    return this.http.delete<void>(url).pipe(
      tap(
        () => {
          console.log(`Event with ID: ${id} deleted`);
          this.dialogueService.showDialogue('eventDeleted');
        },
        (error) => {
          console.error(`Error deleting event with ID: ${id}`, error);
          this.dialogueService.showDialogue('eventDeletionError');
        }
      )
    );
  }

  editEventDetails(eventId: string, updatedEvent: Event): Observable<void> {
    const url = `${this.eventsEndpoint}/${eventId}.json`;
    return this.http.put<void>(url, updatedEvent).pipe(
      tap(
        () => {
          console.log(`Event with ID: ${eventId} updated`);
          this.dialogueService.showDialogue('eventUpdated');
        },
        (error) => {
          console.error(`Error updating event with ID: ${eventId}`, error);
          this.dialogueService.showDialogue('serverError');
        }
      )
    );
  }

  private isUserRegisteredForEvent(eventId: string): boolean {
    this.activeUser = this.authService.getActiveUser();
    return this.activeUser?.regEvents?.some((event) => event.id === eventId) ?? false;
  }

  getEventTypes(): string[] {
    return this.eventTypes;
  }
}
