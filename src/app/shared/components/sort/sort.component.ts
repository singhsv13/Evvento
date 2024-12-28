import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {


  // @Output() sortChange = new EventEmitter<'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'>();

  // onSortChange(direction: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'): void {
  //   this.sortChange.emit(direction);
  // }
  @Output() sortChange = new EventEmitter<'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'>();
  @Input() activeSort: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc' = 'nameAsc';

  onSortChange(direction: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'): void {
    this.sortChange.emit(direction);
  }

  isActive(sort: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'): boolean {
    return this.activeSort === sort;
  }

  constructor() { }

  ngOnInit(): void {
  }


}
