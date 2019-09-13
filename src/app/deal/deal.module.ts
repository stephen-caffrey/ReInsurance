import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { EventListComponent } from '../event/event-list.component';
import { DealListComponent } from './deal-list.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'events', component: EventListComponent },
      { path: 'deals/:id', component: DealListComponent }
    ])
  ],
  declarations: [
    DealListComponent
  ]
})
export class DealModule { }
