import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes,group } from '@angular/animations'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
    animations: [
      trigger( 'guestFormAnimation', [
        state('in', style({height: 66, transform: 'translateX(0)', opacity: 1})),
        transition('void => *', [
          style({height: 4, transform: 'translateY(50px)', opacity: 0}),
          group([
            animate('0.5s 0.2s ease', style({
              transform: 'translateY(0)',
              height: 66
            })),
            animate('0.5s ease', style({
              opacity: 1
            }))
          ])
        ]),
        transition('* => void', [
          group([
            animate('0.5s ease', style({
              transform: 'translateY(50px)',
              height: 0
            })),
            animate('0.5s 0.3s ease', style({
              opacity: 0
            }))
          ])
        ])
      ])
    ]
})
export class RsvpComponent implements OnInit {

  public rsvpForm: FormGroup;
  submittedForm: any;
  name = '';
  email = '';
  phoneNumber = '';
  comments = '';
  numGuests = 0;
  rsvp: FirebaseObjectObservable<any>;

  constructor( private fb: FormBuilder, public auth: AngularFireAuth, private db: AngularFireDatabase ) {
    this.login();

    this.rsvpForm = fb.group({
      'name': [
        this.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      'email': [
        this.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ])
      ],
      'phoneNumber': [
        this.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])
      ],
      'guests': this.fb.array([]),
      'comments': [null, [] ]
    });
  }

  ngOnInit() {
    // this.addNewGuestInput();
    this.login();
    // this.rsvps.forEach( rsvp => {
    //   console.log('Rsvp item = ', rsvp );
    // });
    //console.log('Auth = ', this.auth.auth.currentUser.uid );
    //console.log('User = ', this.user );
  }

  login() {
    var self = this;
    this.auth.auth.signInAnonymously().then( () => {
      self.updateRsvp();
    }).catch(function(error) {
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

  updateRsvp() {
    if( this.auth.auth.currentUser.uid ) {
      var self = this;
      this.rsvp = this.db.object('rsvps/' + this.auth.auth.currentUser.uid );
      // this.rsvp = this.db.list('rsvps/' );
      this.rsvp.subscribe( ( snapshot ) => {
        this.rsvpForm.patchValue( snapshot );
        if( snapshot.guests ) {
          self.numGuests = snapshot.guests.length;
          let control = <FormArray>this.rsvpForm.controls['guests'];
          snapshot.guests.forEach( ( guest, index ) => {
            control.setControl( index, this.initGuest( guest.guestFirstName, guest.guestLastName, guest.type ));
          })
        }
        // (<FormArray>self.rsvpForm.controls['guests']).setValue(snapshot.guests)
        // console.log('Rsvp Snapshot = ', snapshot );
        // self.name = snapshot.name;
        // self.email = snapshot.email;
        // self.phoneNumber = snapshot.phoneNumber;
        // self.comments = snapshot.comments;
        // self.numGuests = snapshot.guests.length;
      });
    }
  }

  initGuest( _guestFirstName: string, _guestLastName: string, _type: string ) {
      return this.fb.group({
          guestFirstName: [ _guestFirstName, Validators.required ],
          guestLastName: [ _guestLastName, Validators.required ],
          type: [ _type, [] ]
      });
  }

  submitRsvp() {
    let rsvpData = this.rsvpForm.value;
    console.log('rsvpData = ', rsvpData );
    //this.rsvp = this.db.list('rsvps');

    if( this.auth.auth.currentUser.uid ) {
      this.rsvp.update( rsvpData );
    } else {
      let rsvps = this.db.list('rsvps');
      rsvps.push( rsvpData );
    }

    this.rsvpForm.reset( this.rsvpForm.value );
    
  }

  addNewGuestInput() {
      this.numGuests++;
      const control = <FormArray>this.rsvpForm.controls['guests'];
      const addrCtrl = this.initGuest( '', '', null );

      control.push(addrCtrl);

      /* subscribe to individual address value changes */
      // addrCtrl.valueChanges.subscribe(x => {
      //   console.log(x);
      // })
  }

    removeGuestInput(i: number) {
      this.numGuests--;
      const control = <FormArray>this.rsvpForm.controls['guests'];
      control.removeAt(i);
    }
}
