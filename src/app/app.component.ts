import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';


@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )

export class AppComponent implements OnInit {
  rla = '';
  

  constructor(  ) {
    
  }

  ngOnInit() {
    // this.login();
    
  }

}
