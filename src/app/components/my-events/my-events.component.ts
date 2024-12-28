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

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchRegisteredEvents();
  }

  fetchRegisteredEvents(): void {
    // const allRegisteredEvents = this.eventService.getRegisteredEvents();
    // const allEvents = this.eventService.getAllEvents(); // Fetch all current events from the service.

    // // Filter registered events to ensure they still exist in the event list.
    // this.events = allRegisteredEvents.filter((registeredEvent) =>
    //   allEvents.some((event) => event.id === registeredEvent.id)
    // );

    // this.updatePaginatedEvents();

    forkJoin({
      allRegisteredEvents: this.eventService.getRegisteredEvents(),
      allEvents: this.eventService.getAllEvents(),
    }).subscribe(({ allRegisteredEvents, allEvents }) => {
      // Filter registered events to ensure they still exist in the event list
      this.events = allRegisteredEvents.filter((registeredEvent) =>
        allEvents.some((event) => event.id === registeredEvent.id)
      );

      this.updatePaginatedEvents();
    });
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
