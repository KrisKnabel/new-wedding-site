import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import * as firebase from 'firebase/app';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )

export class AppComponent implements OnInit {
  rla = '';
  user: Observable<firebase.User>;
  rsvps: FirebaseListObservable<any[]>

  constructor( public auth: AngularFireAuth, db: AngularFireDatabase ) {
    this.user = auth.authState;
    this.rsvps = db.list('rsvps');
  }

  ngOnInit() {
    // this.login();
    this.rsvps.forEach( rsvp => {
      console.log('Rsvp item = ', rsvp );
    });
  }

  login() {
    this.auth.auth.signInAnonymously().catch(function(error) {
      // Handle Errors here.
      const errorCode = error['code'];
      const errorMessage = error.message;

      if ( errorCode === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    });
  }

  logout() {
    this.auth.auth.signOut();
  }
}
