import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Material Required Animation Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


// Gesture Support for Angular Material
import 'hammerjs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Angular Material Component Modules
import { MdTabsModule, MdInputModule, MdCardModule, MdIconModule } from '@angular/material';

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout'


import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'home',
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
    redirectTo: 'home'
  }
]

const firebaseConfig = {
  apiKey: 'AIzaSyBn34r_hVyzUc5I7MiH_Ee9AEvUq56dHtQ',
  authDomain: 'kris-and-kim.firebaseapp.com',
  databaseURL: 'https://kris-and-kim.firebaseio.com',
  projectId: 'kris-and-kim',
  storageBucket: 'kris-and-kim.appspot.com',
  messagingSenderId: '159898231734'
};

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
    FormsModule, ReactiveFormsModule,
    MdTabsModule, MdInputModule, MdCardModule, MdIconModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp( firebaseConfig ),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
} )

export class AppModule { }
