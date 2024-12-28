import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { DialogueComponent } from 'src/app/components/dialogue/dialogue.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { FilterComponent } from '../components/filter/filter.component';
import { SortComponent } from '../components/sort/sort.component';

@NgModule({
  declarations: [PaginationComponent, DialogueComponent, SpinnerComponent, FilterComponent, SortComponent],
  imports: [CommonModule, ProgressSpinnerModule],
  exports: [PaginationComponent, DialogueComponent, ProgressSpinnerModule, SpinnerComponent, SortComponent, FilterComponent],
})
export class SharedModule {}
