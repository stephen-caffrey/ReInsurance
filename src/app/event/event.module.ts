import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { EventListComponent } from './event-list.component';
import { EventEditComponent } from './event-edit.component';
import { EventEditGuard } from './event-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'events', component: EventListComponent },
      {
        path: 'events/:id/edit',
        canDeactivate: [EventEditGuard],
        component: EventEditComponent
      }
    ])
  ],
  declarations: [
    EventListComponent,
    EventEditComponent
  ]
})
export class EventModule { }
