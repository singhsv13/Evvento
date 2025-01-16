import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/Event';
import { filter, forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css'],
})
export class MyEventsComponent implements OnInit {
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  filterType: string = 'all';  // Default filter type is 'all'
  sortDirection: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc' = 'nameAsc';  // Default sort direction
  eventTypes = this.eventService.getEventTypes();
  isLoading : boolean = true;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.isLoading = true; 
    setTimeout(() => {
      this.isLoading = false; 
      this.fetchRegisteredEvents();  
      }, 1000);
  }

  // fetchRegisteredEvents(): void {
  //   // const allRegisteredEvents = this.eventService.getRegisteredEvents();
  //   // const allEvents = this.eventService.getAllEvents(); // Fetch all current events from the service.

  //   // // Filter registered events to ensure they still exist in the event list.
  //   // this.events = allRegisteredEvents.filter((registeredEvent) =>
  //   //   allEvents.some((event) => event.id === registeredEvent.id)
  //   // );

  //   // this.updatePaginatedEvents();

  //   forkJoin({
  //     allRegisteredEvents: this.eventService.getRegisteredEvents(),
  //     allEvents: this.eventService.getAllEvents(),
  //   }).subscribe(({ allRegisteredEvents, allEvents }) => {
  //     // Filter registered events to ensure they still exist in the event list
  //     this.events = allRegisteredEvents.filter((registeredEvent) =>
  //       allEvents.some((event) => event.id === registeredEvent.id)
  //     );

  //     this.updatePaginatedEvents();
  //   });
  // }

  fetchRegisteredEvents(): void {
    forkJoin({
      allRegisteredEvents: this.eventService.getRegisteredEvents(), // Returns string[]
      allEvents: this.eventService.getAllEvents(), // Returns Event[]
    }).subscribe(
      ({ allRegisteredEvents, allEvents }) => {
        // Ensure the types are correctly inferred and matched
        this.events = (allRegisteredEvents || [])
          .map((registeredEvent : Event) => 
            allEvents.find((event) => event.id === registeredEvent.id) || null
          )
          .filter((event): event is Event => !!event); // Filter out null values and ensure type safety
  
        this.updatePaginatedEvents();
      },
      (error) => {
        console.error('Error fetching registered events:', error);
      }
    );
  }
  
  
  

  updatePaginatedEvents(): void {
    let filteredAndSortedEvents = this.events;

    // Apply filter based on event type
    if (this.filterType !== 'all') {
      filteredAndSortedEvents = filteredAndSortedEvents.filter(
        (event) => event.type === this.filterType
      );
    }

    // Apply sorting
    filteredAndSortedEvents = filteredAndSortedEvents.sort((a, b) => {
      switch (this.sortDirection) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateAsc':
          return new Date(a.doe).getTime() - new Date(b.doe).getTime();
        case 'dateDesc':
          return new Date(b.doe).getTime() - new Date(a.doe).getTime();
        default:
          return 0;
      }
    });

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEvents = filteredAndSortedEvents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  totalPages(): number {
    return Math.ceil(this.events.length / this.itemsPerPage);
  }

  onFilterChange(filter: string): void {
    this.filterType = filter;
    this.updatePaginatedEvents();
  }

  onSortChange(direction: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'): void {
    this.sortDirection = direction;
    this.updatePaginatedEvents();
  }

  readMoreClicked(id: string): void {
    this.router.navigate(['event', id]);
  }
}
