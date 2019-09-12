import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Event } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventUrl = 'api/event';
  private eventsUrl = 'api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getEvent(id: number): Observable<Event> {
      return of(this.initializeEvent());
  }

  createEvent(newEvent: Event): Observable<Event> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    newEvent.id = null;
    return this.http.post<Event>(this.eventUrl, newEvent, { headers })
      .pipe(
        tap(data => console.log('createEvent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeEvent(): Event {
    // Return an initialized object
    return {
      id: 0,
      peril: null,
      state: null,
      loss: 0
    };
  }
}
