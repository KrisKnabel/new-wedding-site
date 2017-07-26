
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component( {
    // moduleId: module.id,
    selector: 'app-guest',
    templateUrl: 'guest.component.html'
})

export class GuestComponent implements OnInit {
  @Input('group') public guestForm: FormGroup;
  selectedGuestType = '';
  guestTypes = [
    'Adult',
    'Child'
  ]
  elementDisplayState = 'out';


  ngOnInit () {

  }
}
