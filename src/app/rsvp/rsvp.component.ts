import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  public rsvpForm: FormGroup;
  submittedForm: any;
  name = '';
  email = '';
  phoneNumber = '';
  comments = '';
  numGuests = 0;

  constructor( private fb: FormBuilder ) {
    this.rsvpForm = fb.group({
      'name': [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      'email': [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ])
      ],
      'phoneNumber': [
        null,
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
  }

  initGuest() {
      return this.fb.group({
          guestName: [ '', Validators.required ],
          type: [ null, [] ]
      });
  }

  submitRsvp() {
    this.name = this.submittedForm.name;
    this.email = this.submittedForm.email;
    this.phoneNumber = this.submittedForm.phoneNumber;
    this.comments = this.submittedForm.comments;
  }

  // addNewGuestInput() {
  //   this.guests.push( new Guest( '', false ) );
  // }

  addNewGuestInput() {
      this.numGuests++;
      const control = <FormArray>this.rsvpForm.controls['guests'];
      const addrCtrl = this.initGuest();

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
