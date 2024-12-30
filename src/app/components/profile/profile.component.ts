import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { DialogueService } from 'src/app/services/dialogue.service'; // Import the DialogueService
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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
    private dialogueService: DialogueService, // Inject the DialogueService
    private userService : UserService
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

  deleteUserProfile(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.dialogueService.showDialogue('userDeleted');
          setTimeout(()=>{
            this.authService.logOut(); 
          },2000)
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.dialogueService.showDialogue('serverError');
        }
      });
    }
  }

  editUserDetails(): void {
    // if (this.user) {
    //   // Assuming you have a form to edit user details.
    //   this.userService.updateUser(this.user.id, this.user).subscribe({
    //     next: () => {
    //       this.dialogueService.showDialogue('userUpdated');
    //     },
    //     error: (error) => {
    //       console.error('Error updating user:', error);
    //       this.dialogueService.showDialogue('serverError');
    //     }
    //   });
    // }
  }


  logout(): void {
    this.authService.logOut();
    // Show the logout confirmation dialogue after logging out
    this.dialogueService.showDialogue('logoutConfirmation');
  }

}
