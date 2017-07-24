import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from './guest'

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  rsvpForm: FormGroup;
  submittedForm: any;
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  comments: string = '';
  guests: Guest[] = [];


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
      'guest': [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      'comments': [null, [] ]
    });
  }
  
  ngOnInit() {}

  submitRsvp() { 
    this.name = this.submittedForm.name;
    this.email = this.submittedForm.email;
    this.phoneNumber = this.submittedForm.phoneNumber;
    this.comments = this.submittedForm.comments;
  }

  addNewGuest() {
    this.guests.push( new Guest( '', false ) );
  }
}
