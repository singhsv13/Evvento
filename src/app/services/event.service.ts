// import { Injectable } from '@angular/core';
// import { Event } from '../model/Event';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
// import { map, take, tap } from 'rxjs/operators';
// import { AuthService } from './auth.service';
// import { User } from '../model/User';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { DialogueService } from './dialogue.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class EventService {
//   private baseUrl = environment.firebaseDatabaseURL;
//   private eventsEndpoint = `${this.baseUrl}/events`;
//   private usersEndpoint = `${this.baseUrl}/users`;

//   activeUser: User;

//   eventTypes: string[] = [
//     'Business & Professional',
//     'Entertainment & Leisure',
//     'Technology',
//     'Food & Drink',
//     'Arts & Culture',
//     'Others',
//   ];

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router,
//     private dialogueService: DialogueService
//   ) {}

//   addNewEvent(event: Event): Observable<void> {
//     event.expired = false;
//     const url = `${this.eventsEndpoint}/${event.id}.json`;
//     return this.http.put<void>(url, event).pipe(
//       tap(
//         () => {
//           console.log('Event added:', event);
//           this.dialogueService.showDialogue('eventCreated');
//         },
//         (error) => {
//           console.error('Error adding event:', error);
//           this.dialogueService.showDialogue('serverError');
//         }
//       )
//     );
//   }

//   getEventByID(id: string): Observable<Event> {
//     const url = `${this.eventsEndpoint}/${id}.json`;
//     return this.http.get<Event>(url).pipe(
//       map((event) => {
//         if (event) {
//           this.checkAndMarkExpired(event);
//           event['isRegistered'] = this.isUserRegisteredForEvent(id);
//         }
//         return event;
//       })
//     );
//   }

//   getAllEvents(): Observable<Event[]> {
//     const url = `${this.eventsEndpoint}.json`;
//     return this.http.get<{ [key: string]: Event }>(url).pipe(
//       map((response) => {
//         const events: Event[] = Object.values(response || {});
//         events.forEach((event) => {
//           this.checkAndMarkExpired(event);
//           event['isRegistered'] = this.isUserRegisteredForEvent(event.id);
//         });
//         return events;
//       })
//     );
//   }

//   // registerForEvent(eventId: string): Observable<boolean> {
//   //   this.activeUser = this.authService.getActiveUser();

//   //   if (this.activeUser) {
//   //     const alreadyRegisteredEvent = this.activeUser.regEvents?.find(
//   //       (event) => event.id === eventId
//   //     );

//   //     if (alreadyRegisteredEvent) {
//   //       this.dialogueService.showDialogue('eventAlreadyRegistered');
//   //       return of(false);
//   //     }

//   //     return this.getEventByID(eventId).pipe(
//   //       map((event) => {
//   //         if (event) {
//   //           if (!this.activeUser.regEvents) {
//   //             this.activeUser.regEvents = [];
//   //           }
//   //           this.activeUser.regEvents.push(event);

//   //           const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
//   //           this.http.put(userUrl, this.activeUser.regEvents).subscribe();
//   //           this.dialogueService.showDialogue('eventRegistered');
//   //           return true;
//   //         }
//   //         return false;
//   //       })
//   //     );
//   //   } else {
//   //     this.dialogueService.showDialogue('permissionDenied');
//   //     return of(false);
//   //   }
//   // }
//   registerForEvent(eventId: string): Observable<boolean> {
//       this.authService.getActiveUser().pipe(take(1)).subscribe({
//       next : (user)=>{
//         if(user)
//           this.activeUser = user;
//       }
//     });
//     if (!this.activeUser) {
//       this.dialogueService.showDialogue('permissionDenied');
//       return of(false);
//     }
  
//     this.activeUser.regEvents = this.activeUser.regEvents || [];
  
//     if (this.activeUser.regEvents.includes(eventId)) {
//       this.dialogueService.showDialogue('eventAlreadyRegistered');
//       return of(false);
//     }
  
//     this.activeUser.regEvents.push(eventId);
  
//     const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
//     return this.http.put(userUrl, this.activeUser.regEvents).pipe(
//       tap(() => this.dialogueService.showDialogue('eventRegistered')),
//       map(() => true)
//     );
//   }
  

//   // getRegisteredEvents(): Observable<Event[]> {
//   //   this.activeUser = this.authService.getActiveUser();
//   //   if (!this.activeUser || !this.activeUser.regEvents) {
//   //     return of([]);
//   //   }
//   //   return of(this.activeUser.regEvents);
//   // }
//   getRegisteredEvents(): Observable<Event[]> {
//     this.activeUser = this.authService.getActiveUser();

//     if (!this.activeUser || !this.activeUser.regEvents.length) {
//       return of([]);
//     }

//     const eventObservables = this.activeUser.regEvents.map((eventId) =>
//       this.getEventByID(eventId)
//     );

//     return forkJoin(eventObservables).pipe(
//       map((events) => events.filter((event) => !!event)) // Filter out null responses
//     );
//   }

//   private checkAndMarkExpired(event: Event): void {
//     const eventDate = new Date(event.doe);
//     const currentDate = new Date();
//     event.expired = eventDate < currentDate;
//   }

//   // unRegisterEvent(eventId: string): Observable<boolean> {
//   //   this.activeUser = this.authService.getActiveUser();

//   //   if (this.activeUser && this.activeUser.regEvents) {
//   //     const eventIndex = this.activeUser.regEvents.findIndex(
//   //       (event) => event.id === eventId
//   //     );

//   //     if (eventIndex !== -1) {
//   //       this.activeUser.regEvents.splice(eventIndex, 1);
//   //       const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
//   //       this.http.put(userUrl, this.activeUser.regEvents).subscribe();
//   //       this.dialogueService.showDialogue('eventUnregistered');
//   //       return of(true);
//   //     } else {
//   //       this.dialogueService.showDialogue('eventAlreadyUnregistered');
//   //       return of(false);
//   //     }
//   //   } else {
//   //     this.dialogueService.showDialogue('permissionDenied');
//   //     return of(false);
//   //   }
//   // }

//   unRegisterEvent(eventId: string): Observable<boolean> {
//     this.activeUser = this.authService.getActiveUser();
//     if (!this.activeUser || !this.activeUser.regEvents.includes(eventId)) {
//       this.dialogueService.showDialogue(
//         this.activeUser ? 'eventAlreadyUnregistered' : 'permissionDenied'
//       );
//       return of(false);
//     }
  
//     this.activeUser.regEvents = this.activeUser.regEvents.filter(
//       (id) => id !== eventId
//     );
  
//     const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
//     return this.http.put(userUrl, this.activeUser.regEvents).pipe(
//       tap(() => this.dialogueService.showDialogue('eventUnregistered')),
//       map(() => true)
//     );
//   }
  

//   deleteEvent(id: string): Observable<void> {
//     const url = `${this.eventsEndpoint}/${id}.json`;
//     return this.http.delete<void>(url).pipe(
//       tap(
//         () => {
//           console.log(`Event with ID: ${id} deleted`);
//           this.dialogueService.showDialogue('eventDeleted');
//         },
//         (error) => {
//           console.error(`Error deleting event with ID: ${id}`, error);
//           this.dialogueService.showDialogue('eventDeletionError');
//         }
//       )
//     );
//   }

//   editEventDetails(eventId: string, updatedEvent: Event): Observable<void> {
//     const url = `${this.eventsEndpoint}/${eventId}.json`;
//     return this.http.put<void>(url, updatedEvent).pipe(
//       tap(
//         () => {
//           console.log(`Event with ID: ${eventId} updated`);
//           this.dialogueService.showDialogue('eventUpdated');
//         },
//         (error) => {
//           console.error(`Error updating event with ID: ${eventId}`, error);
//           this.dialogueService.showDialogue('serverError');
//         }
//       )
//     );
//   }

//   // private isUserRegisteredForEvent(eventId: string): boolean {
//   //   this.activeUser = this.authService.getActiveUser();
//   //   return this.activeUser?.regEvents?.some((event) => event.id === eventId) ?? false;
//   // }

//   private isUserRegisteredForEvent(eventId: string): boolean {
//     this.activeUser = this.authService.getActiveUser();
//     // console.log("Active User : ", this.activeUser);
//     return this.activeUser?.regEvents?.includes(eventId) ?? false;
//   }


//   getEventTypes(): string[] {
//     return this.eventTypes;
//   }


//   private updateExpiredStatus(event: Event): void {
//     const url = `${this.eventsEndpoint}/${event.id}.json`;

//     const currentDate = new Date();
//     const eventDate = new Date(event.doe);

//     const isExpired = eventDate < currentDate;

//     // Update Firebase only if expired status has changed
//     if (event.expired !== isExpired) {
//       event.expired = isExpired;
//       this.http.put(url, event).subscribe(
//         () => console.log(`Updated expired status for event ID: ${event.id}`),
//         (error) => console.error(`Failed to update expired status for event ID: ${event.id}`, error)
//       );
//     }
//   }

  
//   updateAllEventsExpiryStatus(): void {
//     const url = `${this.eventsEndpoint}.json`;

//     this.http.get<{ [key: string]: Event }>(url).subscribe(
//       (response) => {
//         const events: Event[] = Object.values(response || {});
//         events.forEach((event) => this.updateExpiredStatus(event));
//       },
//       (error) => console.error('Failed to fetch events for expiry update', error)
//     );
//   }

  
//   startExpiryStatusUpdate(intervalMs: number = 60000): void {
//     setInterval(() => this.updateAllEventsExpiryStatus(), intervalMs);
//   }

// }

import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
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

  private activeUser: User | null = null;

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

  /** Fetch the active user details from AuthService */
  private fetchActiveUser(): Observable<User | null> {
    return this.authService.getActiveUser().pipe(
      take(1),
      tap((user) => (this.activeUser = user))
    );
  }

  /** Add a new event */
  addNewEvent(event: Event): Observable<void> {
    event.expired = false;
    const url = `${this.eventsEndpoint}/${event.id}.json`;
    return this.http.put<void>(url, event).pipe(
      tap({
        next: () => this.dialogueService.showDialogue('eventCreated'),
        error: () => this.dialogueService.showDialogue('serverError'),
      })
    );
  }

  /** Fetch event by ID */
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

  /** Fetch all events */
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

  /** Register for an event */
  registerForEvent(eventId: string): Observable<boolean> {
    return this.fetchActiveUser().pipe(
      switchMap((user) => {
        if (!user) {
          this.dialogueService.showDialogue('permissionDenied');
          return of(false);
        }

        if (user.regEvents?.includes(eventId)) {
          this.dialogueService.showDialogue('eventAlreadyRegistered');
          return of(false);
        }

        user.regEvents = [...(user.regEvents || []), eventId];

        const userUrl = `${this.usersEndpoint}/${user.id}/regEvents.json`;
        return this.http.put(userUrl, user.regEvents).pipe(
          tap(() => this.dialogueService.showDialogue('eventRegistered')),
          map(() => true)
        );
      })
    );
  }

  /** Fetch all registered events */
  getRegisteredEvents(): Observable<Event[]> {
    return this.fetchActiveUser().pipe(
      switchMap((user) => {
        if (!user || !user.regEvents?.length) return of([]);

        const eventObservables = user.regEvents.map((eventId) =>
          this.getEventByID(eventId)
        );
        return forkJoin(eventObservables).pipe(
          map((events) => events.filter(Boolean)) // Filter out null/undefined responses
        );
      })
    );
  }

  /** Unregister from an event */
  unRegisterEvent(eventId: string): Observable<boolean> {
    return this.fetchActiveUser().pipe(
      switchMap((user) => {
        if (!user || !user.regEvents?.includes(eventId)) {
          this.dialogueService.showDialogue(
            user ? 'eventAlreadyUnregistered' : 'permissionDenied'
          );
          return of(false);
        }

        user.regEvents = user.regEvents.filter((id) => id !== eventId);

        const userUrl = `${this.usersEndpoint}/${user.id}/regEvents.json`;
        return this.http.put(userUrl, user.regEvents).pipe(
          tap(() => this.dialogueService.showDialogue('eventUnregistered')),
          map(() => true)
        );
      })
    );
  }

  /** Delete an event */
  deleteEvent(id: string): Observable<void> {
    const url = `${this.eventsEndpoint}/${id}.json`;
    return this.http.delete<void>(url).pipe(
      tap({
        next: () => this.dialogueService.showDialogue('eventDeleted'),
        error: () => this.dialogueService.showDialogue('eventDeletionError'),
      })
    );
  }

  /** Edit event details */
  editEventDetails(eventId: string, updatedEvent: Event): Observable<void> {
    const url = `${this.eventsEndpoint}/${eventId}.json`;
    return this.http.put<void>(url, updatedEvent).pipe(
      tap({
        next: () => this.dialogueService.showDialogue('eventUpdated'),
        error: () => this.dialogueService.showDialogue('serverError'),
      })
    );
  }

  /** Check and mark event as expired */
  private checkAndMarkExpired(event: Event): void {
    const eventDate = new Date(event.doe);
    const currentDate = new Date();
    event.expired = eventDate < currentDate;
  }

  /** Check if the user is registered for an event */
  private isUserRegisteredForEvent(eventId: string): boolean {
    return this.activeUser?.regEvents?.includes(eventId) ?? false;
  }

  /** Fetch event types */
  getEventTypes(): string[] {
    return this.eventTypes;
  }

    startExpiryStatusUpdate(intervalMs: number = 60000): void {
    setInterval(() => this.updateAllEventsExpiryStatus(), intervalMs);
  }

    updateAllEventsExpiryStatus(): void {
    const url = `${this.eventsEndpoint}.json`;

    this.http.get<{ [key: string]: Event }>(url).subscribe(
      (response) => {
        const events: Event[] = Object.values(response || {});
        events.forEach((event) => this.updateExpiredStatus(event));
      },
      (error) => console.error('Failed to fetch events for expiry update', error)
    );
  }

    private updateExpiredStatus(event: Event): void {
    const url = `${this.eventsEndpoint}/${event.id}.json`;

    const currentDate = new Date();
    const eventDate = new Date(event.doe);

    const isExpired = eventDate < currentDate;

    // Update Firebase only if expired status has changed
    if (event.expired !== isExpired) {
      event.expired = isExpired;
      this.http.put(url, event).subscribe(
        () => console.log(`Updated expired status for event ID: ${event.id}`),
        (error) => console.error(`Failed to update expired status for event ID: ${event.id}`, error)
      );
    }
  }

}
