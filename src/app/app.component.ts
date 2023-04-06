import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get role() {
    return localStorage.getItem('role');
  }

  get getName(){
    return localStorage.getItem('login');
  }

}
