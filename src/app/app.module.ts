import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

// Angular Material Animation Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Gesture Support for Angular Material
import 'hammerjs';

// Angular Material Component Modules
import { MdTabsModule } from '@angular/material';

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout'


import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'rsvp',
    component: RsvpComponent
  },
  {
    path: 'gifts',
    component: GiftsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    RsvpComponent,
    GiftsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdTabsModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
