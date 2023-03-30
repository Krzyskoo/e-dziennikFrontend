import { Component, OnInit } from '@angular/core';
import { StudentModel, StudentService } from './user-service/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get role() {
    return localStorage.getItem('role');
  }

}
