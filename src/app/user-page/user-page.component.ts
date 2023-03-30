import { Component, OnInit } from '@angular/core';
import { StudentModel, StudentService } from '../user-service/student.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private studentService: StudentService) {

  }

  async ngOnInit(): Promise<void> {
    this.students = await this.studentService.getStudents();
    console.log(this.students)
  }

  title = 'dzinniczekFront';
  students : StudentModel[] = [];
  displayColumns : string[] = ['name'];

  get getName(){
    return localStorage.getItem('login');
  }
}
