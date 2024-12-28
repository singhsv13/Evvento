import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  // eventTypes = this.eventService.getEventTypes();
  @Input() options : string[]
  @Input() defaultOption: string = 'all';
  @Input() label: string = 'Filter by Type:';
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  selectedOption: string = this.defaultOption;

  constructor(private eventService : EventService) { }

  ngOnInit(): void {
    this.selectedOption = this.defaultOption;
  }

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedValue);
  }

}
