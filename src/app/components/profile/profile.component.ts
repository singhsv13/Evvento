import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { DialogueService } from 'src/app/services/dialogue.service'; // Import the DialogueService
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: User;
  showModal: boolean = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private dialogueService: DialogueService, 
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getActiveUser();

    if (!this.user) {
      console.error('No active user found!');
      return;
    }
    
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

  toggleEditProfile() {
    this.showModal = !this.showModal; 
  }

  saveProfileChanges(form : NgForm){
    // console.log("Form : ", form);
    if (form.valid) {
      this.user.name = form.value.name;
      this.user.email = form.value.email;
      // console.log(this.user)
      
      this.editUserDetails();
      this.toggleEditProfile();
    } else {
      console.error('Form is invalid');
    }
  }

  editUserDetails(): void {
    if (this.user) {
      console.log(this.user)
      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          this.dialogueService.showDialogue('userUpdated');
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.dialogueService.showDialogue('serverError');
        }
      });
    }
  }


  logout(): void {
    this.authService.logOut();
    this.dialogueService.showDialogue('logoutConfirmation');
  }

}
