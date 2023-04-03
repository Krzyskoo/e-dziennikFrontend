import { Component, OnInit } from '@angular/core';
import { StudentModel, StudentService } from '../user-service/student.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private studentService: StudentService, private router: Router) {

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

  toggle = true;

  toMarks(): void {
    this.toggle = !this.toggle;
    console.log("witam");
    this.router.navigate(['/marks']);
    console.log("zegnam")
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
