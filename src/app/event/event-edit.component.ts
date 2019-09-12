import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Event } from './event';
import { EventService } from './event.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Event Add';
  errorMessage: string;
  eventForm: FormGroup;
  peril = [];
  state = [];

  event: Event;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      peril: {
        required: 'Peril name is required.'
      },
      state: {
        required: 'State code is required.'
      },
      loss: {
        range: 'Loss must be a whole number between 1 (lowest) and 50,000 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      peril: ['', [Validators.required]],
      state: ['', Validators.required],
      loss: ['', NumberValidators.range(1, 50000)]
    });

    this.peril = this.getPerils();
    this.state = this.getStates();
  }

  getPerils() {
    return [
      { id: 'HURRICANE', name: 'Hurricane' },
      { id: 'EARTHQUAKE', name: 'Earthquake' },
      { id: 'FLOOD', name: 'Flood' }
    ];
  }

  getStates() {
    return [
      { id: 'CALIFORNIA', name: 'California' },
      { id: 'LOUISIANA', name: 'Louisiana' },
      { id: 'FLORIDA', name: 'Florida' }
    ];
  }

  ngOnDestroy(): void { }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.eventForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventForm);
    });
  }

  getEvent(id: number): void {
    this.eventService.getEvent(id)
      .subscribe({
        next: (event: Event) => this.displayEvent(event),
        error: err => this.errorMessage = err
      });
  }

  displayEvent(event: Event): void {
    if (this.eventForm) {
      this.eventForm.reset();
    }
    this.event = event;
    this.pageTitle = 'Add Event';

    // Update the data on the form
    this.eventForm.patchValue({
      peril: this.event.peril,
      state: this.event.state,
      loss: this.event.loss
    });
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      if (this.eventForm.dirty) {
        const p = { ...this.event, ...this.eventForm.value };
        this.eventService.createEvent(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
