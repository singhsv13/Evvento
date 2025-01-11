import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dialogue } from '../model/Dialogue';

@Injectable({
  providedIn: 'root',
})
export class DialogueService {
  constructor() {}

  private dialogueSource = new BehaviorSubject<Dialogue | null>(null);
  currentDialogue = this.dialogueSource.asObservable();

  dialogues : Record<string, Dialogue> = {
    // Authentication
    loginSuccess: { message: 'Welcome back! Ready to plan your next event?', type: 'success' } as const,
    loginFailure: { message: 'Oops! Incorrect email or password. Please try again.', type: 'error' } as const,
    logoutConfirmation: { message: 'You’ve been logged out. See you soon!', type: 'info' } as const,
    loginRequired: { message: 'You need to log in to access this feature.', type: 'warning' } as const,
    loginStatus : { message: 'No user is currently logged in.', type: 'info' } as const,

    // User Registration
    registrationSuccess: { message: 'Your account has been created successfully!', type: 'success' } as const,
    registrationError: { message: 'Something went wrong during registration. Please try again.', type: 'error' } as const,

    // User Actions
    usersFetched: { message: 'Users fetched successfully.', type: 'success' } as const,
    userFetched: { message: 'User details retrieved successfully.', type: 'success' } as const,
    userNotFound: { message: 'User not found. Please check the ID.', type: 'info' } as const,
    userAdded: { message: 'User added successfully.', type: 'success' } as const,
    userUpdated: { message: 'User details updated successfully.', type: 'success' } as const,
    userDeleted: { message: 'User deleted successfully.', type: 'success' } as const,
    invalidCredentials: { message: 'Invalid email or password. Please try again.', type: 'error' } as const,
    authenticationSuccess: { message: 'User authenticated successfully.', type: 'success' } as const,

    // Event Actions
    eventRegistered: { message: 'You’ve successfully registered for this event!', type: 'success' } as const,
    eventAlreadyRegistered: { message: 'You’ve already registered for this event.', type: 'info' } as const,
    eventUnregistered: { message: 'You’ve been unregistered from the event.', type: 'success' } as const,
    eventAlreadyUnregistered: { message: 'You’re not registered for this event.', type: 'info' } as const,
    eventFull: { message: 'This event is fully booked.', type: 'warning' } as const,
    eventDeletionError: { message: 'Oops! Error occurred in deleting event.', type: 'error' } as const,

    // Event Creation/Modification
    eventCreated: { message: 'Event has been registered successfully!', type: 'success' } as const,
    eventUpdated: { message: 'Event details updated successfully!', type: 'success' } as const,
    eventDeleted: { message: 'Event deleted successfully.', type: 'success' } as const,

    // Confirmations
    unregisterConfirmation: { message: 'Are you sure you want to unregister from this event?', type: 'warning' } as const,
    deleteEventConfirmation: { message: 'Are you sure you want to delete this event?', type: 'warning' } as const,

    // Notifications and Reminders
    reminder: { message: 'Reminder: Your event is happening soon.', type: 'info' } as const,
    eventSavedToFavorites: { message: 'This event has been added to your favorites.', type: 'success' } as const,
    eventRemovedFromFavorites: { message: 'This event has been removed from your favorites.', type: 'info' } as const,

    // Click Actions
    eventAlreadyRegisteredClick: { message: 'You are already registered. No action is required.', type: 'info' } as const,
    eventAlreadyUnregisteredClick: { message: 'You are not registered for this event. Please register first.', type: 'info' } as const,

    // Errors
    networkError: { message: 'We’re having trouble connecting to the server.', type: 'error' } as const,
    serverError: { message: 'Something went wrong on our end. Please try again later.', type: 'error' } as const,
    invalidEventAction: { message: 'This action is not valid for the current event.', type: 'error' } as const,
    permissionDenied: { message: 'You do not have permission to perform this action.', type: 'error' } as const,

    // Success Messages
    eventReRegisterSuccess: { message: 'You’ve re-registered for this event successfully!', type: 'success' } as const,

    // Miscellaneous
    searchSuccess: { message: 'Here are the results matching your criteria.', type: 'success' } as const,
    searchFailure: { message: 'No results found. Try different search terms.', type: 'info' } as const,
  };

  showDialogue(key: string): void {
    const dialogue = this.dialogues[key];
    if (dialogue) {
      this.dialogueSource.next(dialogue);

      // Automatically clear the dialogue after 5 seconds
      setTimeout(() => this.clearDialogue(), 5000);
    }
  }

  clearDialogue(): void {
    this.dialogueSource.next(null);
  }
}
