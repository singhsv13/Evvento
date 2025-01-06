import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  eventList: Event[] = [];
  upcomingEvents: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    // Fetch all events and calculate upcoming events
    this.eventService.getAllEvents().subscribe((data) => {
      this.eventList = data;
      this.calculateUpcomingEvents();
      console.log(this.eventList);
      console.log(this.upcomingEvents);
    });
  }

  onExploreClicked(): void {
    this.router.navigateByUrl('all-events');
  }

  private calculateUpcomingEvents(): void {
    const today = new Date();

    this.upcomingEvents = this.eventList
      .filter((event) => new Date(event.doe) > today)
      .sort((a, b) => new Date(a.doe).getTime() - new Date(b.doe).getTime())
      .slice(0, 3);
  }

  onBtnClicked(): void {
    this.router.navigateByUrl('login');
  }
}
