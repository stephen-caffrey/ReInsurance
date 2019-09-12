import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { EventModule } from './event/event.module';
import { DealModule } from './deal/deal.module';
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {AppData} from "./model/app-data";
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    !environment.production && !environment.local ? InMemoryWebApiModule.forRoot(AppData) : [],
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    EventModule,
    DealModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
