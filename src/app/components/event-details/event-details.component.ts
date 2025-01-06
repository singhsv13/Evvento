import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogueService } from 'src/app/services/dialogue.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  id: string;
  event: Event = {
    id: '',
    name: '',
    desc: '',
    type: '',
    location: '',
    doe: '',
    organisedBy: '',
    imageURL: '',
    expired: false,
  };
  loginStatus: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogueService: DialogueService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        if (this.id) {
          this.fetchEventById(this.id);
        }
      },
      error: (err) => {
        console.error('Error retrieving route parameters:', err);
      },
    });
  }

  fetchEventById(id: string) {
    this.eventService.getEventByID(id).subscribe({
      next: (data) => {
        if (data) {
          this.event = { ...data };
        } else {
          this.dialogueService.showDialogue('serverError');
        }
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
        this.dialogueService.showDialogue('networkError');
      },
    });
  }

  onRegisterClicked(eventId: string) {
    this.loginStatus = this.authService.isAuthenticated();

    if (this.loginStatus) {
      this.eventService.registerForEvent(eventId).subscribe({
        next: (isRegistered) => {
          if (isRegistered) {
            this.dialogueService.showDialogue('eventRegistered');
            this.router.navigate(['my-events']);
          } else {
            this.dialogueService.showDialogue('eventAlreadyRegistered');
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.dialogueService.showDialogue('serverError');
        },
      });
    } else {
      this.dialogueService.showDialogue('loginFailure');
      this.router.navigate(['login']);
    }
  }

  onUnregisterClicked(eventId: string) {
    this.loginStatus = this.authService.isAuthenticated();

    if (this.loginStatus) {
      this.eventService.unRegisterEvent(eventId).subscribe({
        next: (isUnregistered) => {
          if (isUnregistered) {
            this.dialogueService.showDialogue('eventUnregistered');
            this.router.navigate(['my-events']);
          } else {
            this.dialogueService.showDialogue('eventAlreadyRegistered');
          }
        },
        error: (err) => {
          console.error('Unregistration failed:', err);
          this.dialogueService.showDialogue('serverError');
        },
      });
    } else {
      this.dialogueService.showDialogue('loginFailure');
      this.router.navigate(['login']);
    }
  }

  onEditClicked(id: string) {
    this.loginStatus = this.authService.isAuthenticated();
  
    if (this.loginStatus) {
      this.router.navigate([`/event/edit`, id], { queryParams: { edit: true } });
    } else {
      this.dialogueService.showDialogue('loginRequired');
      this.router.navigate(['/login']);
    }
  }
  

  onDeleteClicked(id: string) {
    this.dialogueService.showDialogue('unregisterConfirmation');
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.dialogueService.showDialogue('eventDeleted');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error deleting event:', err);
        this.dialogueService.showDialogue('serverError');
      },
    });
  }

  isEventExpired(): boolean {
    const currentDate = new Date();
    const eventDate = new Date(this.event.doe);
    return eventDate < currentDate;
  }
}
