// import { Injectable } from '@angular/core';
// import { Event } from '../model/Event';
// import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
// import { AuthService } from './auth.service';
// import { User } from '../model/User';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class EventService {
//   eventList: Event[] = [
//     {
//       id: '1',
//       name: 'Tech Innovators Conference',
//       desc: 'A global conference showcasing the latest innovations in technology.',
//       type: 'Technology',
//       location: 'San Francisco, CA',
//       doe: '2025-06-10',
//       organisedBy: 'TechCorp',
//       imageURL: 'https://example.com/images/tech_innovators.jpg',
//       expired: false,
//     },
//     {
//       id: '2',
//       name: 'Art & Culture Festival',
//       desc: 'A celebration of global art and cultural diversity with performances and exhibitions.',
//       type: 'Arts & Culture',
//       location: 'Paris, France',
//       doe: '2025-07-15',
//       organisedBy: 'Artistry International',
//       imageURL: 'https://example.com/images/art_culture.jpg',
//       expired: false,
//     },
//     {
//       id: '3',
//       name: 'International Business Summit',
//       desc: 'A meeting of business leaders to discuss strategies for global economic growth.',
//       type: 'Business & Professional',
//       location: 'London, UK',
//       doe: '2025-05-20',
//       organisedBy: 'Global Business Forum',
//       imageURL: 'https://example.com/images/business_summit.jpg',
//       expired: false,
//     },
//     {
//       id: '4',
//       name: 'Healthcare Innovation Expo',
//       desc: 'A trade show featuring the latest advancements in healthcare technology and practices.',
//       type: 'Healthcare',
//       location: 'New York, NY',
//       doe: '2025-09-05',
//       organisedBy: 'HealthTech Solutions',
//       imageURL: 'https://example.com/images/healthcare_expo.jpg',
//       expired: false,
//     },
//     {
//       id: '5',
//       name: 'Startup Bootcamp',
//       desc: 'A week-long bootcamp for budding entrepreneurs to learn from experts in the startup world.',
//       type: 'Business & Professional',
//       location: 'Berlin, Germany',
//       doe: '2025-04-25',
//       organisedBy: 'Startup Academy',
//       imageURL: 'https://example.com/images/startup_bootcamp.jpg',
//       expired: false,
//     },
//     {
//       id: '6',
//       name: 'Music Lovers Festival',
//       desc: 'A weekend celebration of live music from various genres.',
//       type: 'Music & Entertainment',
//       location: 'Austin, TX',
//       doe: '2025-08-14',
//       organisedBy: 'MusicWorld',
//       imageURL: 'https://example.com/images/music_festival.jpg',
//       expired: false,
//     },
//     {
//       id: '7',
//       name: 'Digital Marketing Expo',
//       desc: 'An event for digital marketers to learn the latest trends and techniques in online marketing.',
//       type: 'Marketing & Sales',
//       location: 'Los Angeles, CA',
//       doe: '2025-10-01',
//       organisedBy: 'DigitalMarketers Inc.',
//       imageURL: 'https://example.com/images/digital_marketing.jpg',
//       expired: false,
//     },
//     {
//       id: '8',
//       name: 'Environmental Sustainability Conference',
//       desc: 'A global summit to discuss strategies for a more sustainable future.',
//       type: 'Environment',
//       location: 'Sydney, Australia',
//       doe: '2025-11-21',
//       organisedBy: 'GreenFuture Org.',
//       imageURL: 'https://example.com/images/environment_conference.jpg',
//       expired: false,
//     },
//     {
//       id: '9',
//       name: 'Fashion Week New York',
//       desc: 'A premier event for the latest in high-end fashion and design.',
//       type: 'Fashion',
//       location: 'New York, NY',
//       doe: '2025-09-10',
//       organisedBy: 'NY Fashion Society',
//       imageURL: 'https://example.com/images/fashion_week.jpg',
//       expired: false,
//     },
//     {
//       id: '10',
//       name: 'Culinary Arts Expo',
//       desc: 'A showcase of global cuisine from renowned chefs and culinary experts.',
//       type: 'Food & Drink',
//       location: 'Rome, Italy',
//       doe: '2025-06-30',
//       organisedBy: 'Culinary Creators',
//       imageURL: 'https://example.com/images/culinary_arts.jpg',
//       expired: false,
//     },
//     {
//       id: '11',
//       name: 'Smart Cities Expo',
//       desc: 'An event exploring the latest innovations in urban development and smart technology.',
//       type: 'Technology',
//       location: 'Dubai, UAE',
//       doe: '2025-05-18',
//       organisedBy: 'SmartCity Expo',
//       imageURL: 'https://example.com/images/smart_cities.jpg',
//       expired: false,
//     },
//     {
//       id: '12',
//       name: 'Film Industry Awards',
//       desc: 'A glamorous event to celebrate the best in cinema and filmmaking.',
//       type: 'Entertainment',
//       location: 'Los Angeles, CA',
//       doe: '2025-02-10',
//       organisedBy: 'Hollywood Films',
//       imageURL: 'https://example.com/images/film_awards.jpg',
//       expired: false,
//     },
//     {
//       id: '13',
//       name: 'Space Exploration Summit',
//       desc: 'A conference to discuss the future of space exploration and commercial space ventures.',
//       type: 'Science & Technology',
//       location: 'Houston, TX',
//       doe: '2025-08-05',
//       organisedBy: 'SpaceTech Ventures',
//       imageURL: 'https://example.com/images/space_exploration.jpg',
//       expired: false,
//     },
//     {
//       id: '14',
//       name: 'AI and Robotics Forum',
//       desc: 'An event focused on the integration of AI and robotics across industries.',
//       type: 'Technology',
//       location: 'Tokyo, Japan',
//       doe: '2025-07-25',
//       organisedBy: 'AI Robotics Corp.',
//       imageURL: 'https://example.com/images/ai_robotics.jpg',
//       expired: false,
//     },
//     {
//       id: '15',
//       name: 'Crypto & Blockchain Summit',
//       desc: 'A gathering of crypto enthusiasts and blockchain developers to explore new opportunities.',
//       type: 'Finance & Technology',
//       location: 'Singapore',
//       doe: '2025-09-12',
//       organisedBy: 'CryptoWorld',
//       imageURL: 'https://example.com/images/crypto_blockchain.jpg',
//       expired: false,
//     },
//     {
//       id: '16',
//       name: 'Adventure Sports Challenge',
//       desc: 'A thrilling competition for adventure sports enthusiasts.',
//       type: 'Sports & Recreation',
//       location: 'Vancouver, Canada',
//       doe: '2025-07-02',
//       organisedBy: 'AdventureSports Inc.',
//       imageURL: 'https://example.com/images/adventure_sports.jpg',
//       expired: false,
//     },
//     {
//       id: '17',
//       name: 'Coding Bootcamp for Beginners',
//       desc: 'An intensive coding bootcamp aimed at aspiring software developers.',
//       type: 'Education & Learning',
//       location: 'San Diego, CA',
//       doe: '2025-04-14',
//       organisedBy: 'TechLearn Academy',
//       imageURL: 'https://example.com/images/coding_bootcamp.jpg',
//       expired: false,
//     },
//     {
//       id: '18',
//       name: 'Global Entrepreneurship Summit',
//       desc: 'A summit to inspire and equip entrepreneurs with the tools they need to succeed.',
//       type: 'Business & Professional',
//       location: 'Dubai, UAE',
//       doe: '2025-11-05',
//       organisedBy: 'Entrepreneurship Foundation',
//       imageURL: 'https://example.com/images/entrepreneurship_summit.jpg',
//       expired: false,
//     },
//     {
//       id: '19',
//       name: 'World Poetry Festival',
//       desc: 'An event celebrating the art of poetry with poets from around the world.',
//       type: 'Arts & Culture',
//       location: 'London, UK',
//       doe: '2025-03-22',
//       organisedBy: 'Poetry Society',
//       imageURL: 'https://example.com/images/poetry_festival.jpg',
//       expired: false,
//     },
//     {
//       id: '20',
//       name: 'International Chef Competition',
//       desc: 'A prestigious competition where top chefs showcase their culinary skills.',
//       type: 'Food & Drink',
//       location: 'Paris, France',
//       doe: '2025-06-20',
//       organisedBy: 'Gourmet Chefs',
//       imageURL: 'https://example.com/images/chef_competition.jpg',
//       expired: false,
//     },
//   ];

//   activeUser: User;
  
//   eventTypes: string[] = [
//     'Business & Professional',
//     'Entertainment & Leisure',
//     'Technology',
//     'Food & Drink',
//     'Arts & Culture',
//     'Others',
//   ];

//   constructor(private authService: AuthService, private router: Router) {}

//   /**
//    * Add a new event to the event list.
//    */
//   addNewEvent(event: Event) {
//     console.log('Added event:', event);
//     event.expired = false;
//     this.eventList.push(event);
//   }

//   /**
//    * Get an event by its ID.
//    */
//   getEventByID(id: string): Observable<Event> {
//     const event = this.eventList.find((event) => event.id === id);
//     if (event) {
//       this.checkAndMarkExpired(event);
//       event['isRegistered'] = this.isUserRegisteredForEvent(id); // Add the flag
//     }
//     return of(event);
//   }

//   /**
//    * Get all events as an array.
//    */
//   getAllEvents(): Event[] {
//     this.eventList.forEach((event) => {
//       this.checkAndMarkExpired(event);
//       event['isRegistered'] = this.isUserRegisteredForEvent(event.id); // Add the flag
//     });
//     return this.eventList;
//   }

//   /**
//    * Get all events as an observable.
//    */
//   getAllEventsObservable(): Observable<Event[]> {
//     this.eventList.forEach((event) => {
//       this.checkAndMarkExpired(event);
//       event['isRegistered'] = this.isUserRegisteredForEvent(event.id); // Add the flag
//     });
//     return of(this.eventList);
//     // return of(this.eventList).pipe(delay(1000));
//   }

//   /**
//    * Register a user for an event.
//    */
//   registerForEvent(eventId: string): Observable<boolean> {
//     this.activeUser = this.authService.getActiveUser();

//     if (this.activeUser) {
//       const alreadyRegistered = this.activeUser.regEvents?.find(
//         (event) => event.id === eventId
//       );

//       if (alreadyRegistered) {
//         console.error('User is already registered for this event.');
//         return of(false);
//       }

//       return this.getEventByID(eventId).pipe(
//         map((event) => {
//           if (event) {
//             if (!this.activeUser.regEvents) {
//               this.activeUser.regEvents = [];
//             }
//             this.activeUser.regEvents.push(event);
//             console.log('User registered for event:', event);
//             return true;
//           }
//           return false;
//         })
//       );
//     } else {
//       console.error('No active user found.');
//       return of(false);
//     }
//   }

//   /**
//    * unRegister a user for an event.
//    */

//   unRegisterEvent(eventId: string): Observable<boolean> {
//     this.activeUser = this.authService.getActiveUser();

//     if (this.activeUser) {
//       const eventIndex = this.activeUser.regEvents?.findIndex(
//         (event) => event.id === eventId
//       );

//       if (eventIndex !== undefined && eventIndex !== -1) {
//         this.activeUser.regEvents?.splice(eventIndex, 1);
//         console.log('User unregistered from event:', eventId);
//         return of(true);
//       } else {
//         console.error('User is not registered for this event.');
//         return of(false);
//       }
//     } else {
//       console.error('No active user found.');
//       return of(false);
//     }
//   }

//   /**
//    * Get the list of events registered by the user.
//    */
//   getRegisteredEvents(): Event[] {
//     this.activeUser = this.authService.getActiveUser();
//     return this.activeUser ? this.activeUser.regEvents : [];
//   }

//   /**
//    * Edit an event's details.
//    */
//   editEventDetails(eventId: string, updatedEvent: Event): Observable<boolean> {
//     const eventIndex = this.eventList.findIndex((event) => event.id === eventId);

//     if (eventIndex !== -1) {
//       this.eventList[eventIndex] = updatedEvent;
//       console.log('Event updated:', updatedEvent);
//       return of(true);
//     } else {
//       console.error('Event not found.');
//       return of(false);
//     }
//   }

//   /**
//    * Delete an event by its ID.
//    */
//   deleteEvent(eventId: string): Observable<boolean> {
//     const eventIndex = this.eventList.findIndex((event) => event.id === eventId);

//     if (eventIndex !== -1) {
//       this.eventList.splice(eventIndex, 1);
//       console.log('Event deleted with ID:', eventId);
//       return of(true);
//     } else {
//       console.error('Event not found.');
//       return of(false);
//     }
//   }

//   /**
//    * Check and mark an event as expired if the date has passed.
//    */
//   private checkAndMarkExpired(event: Event): void {
//     const eventDate = new Date(event.doe);
//     const currentDate = new Date();

//     event.expired = eventDate < currentDate;
//   }

//   /**
//    * Check if the user is registered for an event.
//    */
//   private isUserRegisteredForEvent(eventId: string): boolean {
//     this.activeUser = this.authService.getActiveUser();
//     return (
//       this.activeUser?.regEvents?.some((event) => event.id === eventId) || false
//     );
//   }

//   getEventTypes() : string[] {
//     return this.eventTypes;
//   }
// }


import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    private router: Router
  ) {}

  addNewEvent(event: Event): Observable<void> {
    event.expired = false;
    const url = `${this.eventsEndpoint}/${event.id}.json`;
    return this.http.put<void>(url, event).pipe(
      tap(() => console.log('Event added:', event))
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
        console.log("Response: ",response);
        
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
        console.error('User is already registered for this event.');
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
            console.log('User registered for event:', event);
            return true;
          }
          return false;
        })
      );
    } else {
      console.error('No active user found.');
      return of(false);
    }
  }

  // EventService
getRegisteredEvents(): Observable<Event[]> {
  this.activeUser = this.authService.getActiveUser(); // Fetch the active user
  
  // If no active user or no registered events, return an empty array
  if (!this.activeUser || !this.activeUser.regEvents) {
    return of([]); // Return an observable of an empty array
  }
  
  // Otherwise, return the user's registered events as an observable
  return of(this.activeUser.regEvents); // Return the registered events
}


  private checkAndMarkExpired(event: Event): void {
    const eventDate = new Date(event.doe);
    const currentDate = new Date();

    if (eventDate < currentDate) {
      event.expired = true;
    } else {
      event.expired = false;
    }
  }

  unRegisterEvent(eventId: string): Observable<boolean> {
    this.activeUser = this.authService.getActiveUser();
  
    if (this.activeUser && this.activeUser.regEvents) {
      const eventIndex = this.activeUser.regEvents.findIndex(
        (event) => event.id === eventId
      );
  
      if (eventIndex !== -1) {
        // Remove the event from the user's registered events
        this.activeUser.regEvents.splice(eventIndex, 1);
  
        // Update the registered events in the backend
        const userUrl = `${this.usersEndpoint}/${this.activeUser.id}/regEvents.json`;
        this.http.put(userUrl, this.activeUser.regEvents).subscribe();
  
        console.log(`Unregistered from event with ID: ${eventId}`);
        return of(true); // Unregistration successful
      } else {
        console.error(`Event with ID: ${eventId} not found in registered events.`);
        return of(false); // Event not found
      }
    } else {
      console.error('No active user or no registered events found.');
      return of(false); // No active user or registered events
    }
  }
  
  deleteEvent(id: string): Observable<void> {
  const url = `${this.eventsEndpoint}/${id}.json`;
  return this.http.delete<void>(url).pipe(
    tap(
      () => {
        console.log(`Event with ID: ${id} deleted`);

        // Optionally, handle UI update logic:
        // For instance, you can remove the event from the list of events in the UI state (if you store events in a service).
        // If you're working with a local list of events, filter out the deleted event here.
        // This could be done by calling another method that updates the list of events in your component.
      },
      (error) => {
        console.error(`Error deleting event with ID: ${id}`, error);
        // Optionally, handle the error by showing a user-friendly message
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

        // Optionally, update the UI after the event is updated:
        // If you have a list of events in your state, you may want to update the event locally
        // For example:
        // 1. Find the event in the local list.
        // 2. Update the event with the new details.
        // 3. Trigger change detection or use a method to update the UI.
      },
      (error) => {
        console.error(`Error updating event with ID: ${eventId}`, error);
        // Optionally, handle the error by showing a user-friendly message
      }
    )
  );
}

  private isUserRegisteredForEvent(eventId: string): boolean {
    this.activeUser = this.authService.getActiveUser();
    return this.activeUser?.regEvents?.some((event) => event.id === eventId) ?? false;
  }

  getEventTypes() : string[] {
        return this.eventTypes;
      }
}
