import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { EventService } from '../services/event.service';
import { Event } from '../model/Event';

@Injectable({
  providedIn: 'root'
})

export class ResolveGuard implements Resolve<Event[]> {
  
  constructor(private eventService: EventService, private router: Router) {}
  resolve(): Observable<Event[]> {
    return this.eventService.getAllEvents().pipe(
      catchError((error) => {
        console.error('Error fetching events:', error);
        // Optionally redirect to an error page
        this.router.navigate(['/error'], {
          queryParams: { message: 'Error fetching events.' },
        });
        return of([]); // Return an empty array as fallback
      })
    );
  }
}