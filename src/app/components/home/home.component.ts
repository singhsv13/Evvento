import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  activeEvents: Event[] = [];
  expiredEvents: Event[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedEvents: Event[] = [];

  isLoading : boolean = true;

  sortDirection: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc' = 'nameAsc';

  eventTypes = this.eventService.getEventTypes();

  filterType: string = 'all';
  totalPages: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    // Trigger periodic expiry status updates
    this.eventService.startExpiryStatusUpdate();
  
    // Load data using the resolve guard and process events
    this.route.data.subscribe((data) => {
      this.isLoading = true; 
      setTimeout(() => {
        this.isLoading = false; 
        this.events = data['events'] || [];
        
        
        this.updateEventLists();
        this.updatePaginatedEvents();
      }, 1000); 
    });
  }
  

  updateEventLists(): void {
    this.expiredEvents = this.events.filter((event) => event.expired);
    this.activeEvents = this.events.filter((event) => !event.expired);
  }

  onFilterChange(filter: string): void {
    this.filterType = filter;
    this.updatePaginatedEvents(); // Update events based on filter
  }

  onSortChange(direction: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'): void {
    this.sortDirection = direction;
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents(): void {
    let filteredAndSortedEvents = this.events;

    if (this.filterType !== 'all') {
      filteredAndSortedEvents = filteredAndSortedEvents.filter((event) => event.type === this.filterType);
    }

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

    this.totalPages = Math.ceil(filteredAndSortedEvents.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEvents = filteredAndSortedEvents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  onLinkClicked(id: string): void {
    this.router.navigate(['event', id]);
  }
}
