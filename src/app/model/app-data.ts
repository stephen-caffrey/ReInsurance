import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Event } from '../event/event';
import {Deal} from "../deal/deal";

export class AppData implements InMemoryDbService {

  createDb() {
    const events: Event[] = [
      {
        id: 1,
        peril: 'EARTHQUAKE',
        state: 'CALIFORNIA',
        loss: 1000
      },
      {
        id: 2,
        peril: 'FLOOD',
        state: 'LOUISIANA',
        loss: 500
      },
      {
        id: 3,
        peril: 'FLOOD',
        state: 'FLORIDA',
        loss: 750
      },
      {
        id: 4,
        peril: 'HURRICANE',
        state: 'FLORIDA',
        loss: 2000
      }
    ];

    const deals: Deal[] = [
      {
        id: 1,
        loss: 1000
      },
      {
        id: 2,
        loss: 500
      },
      {
        id: 3,
        loss: 750
      },
      {
        id: 4,
        loss: 2000
      }
    ];

    return { events, deals };
  }
}
