import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { DialogueService } from 'src/app/services/dialogue.service'; // Import the DialogueService
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private dialogueService: DialogueService // Inject the DialogueService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getActiveUser();

    if (!this.user) {
      console.error('No active user found!');
      return;
    }
    // const allRegisteredEvents = this.eventService.getRegisteredEvents();
    // const allEvents = this.eventService.getAllEvents(); 

    // this.user.regEvents = allRegisteredEvents.filter((registeredEvent) =>
    //   allEvents.some((event) => event.id === registeredEvent.id)
    // );

    forkJoin({
      allRegisteredEvents: this.eventService.getRegisteredEvents(),
      allEvents: this.eventService.getAllEvents(),
    }).subscribe(({ allRegisteredEvents, allEvents }) => {
      this.user.regEvents = allRegisteredEvents.filter((registeredEvent) =>
        allEvents.some((event) => event.id === registeredEvent.id)
      );
    });
  }

  logout(): void {
    this.authService.logOut();
    // Show the logout confirmation dialogue after logging out
    this.dialogueService.showDialogue('logoutConfirmation');
  }
}
