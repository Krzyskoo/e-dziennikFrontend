import {Component, OnInit} from "@angular/core";
import {StudentModel, StudentService} from "../user-service/student.service";
import {Router} from "@angular/router";

@Component({selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit{
  constructor(private studentService: StudentService, public router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.students = await this.studentService.getStudents();
    console.log(this.students)
  }

  students : StudentModel[] = [];
  displayColumns : string[] = ['name'];

  get getName(){
    return localStorage.getItem('login');
  }

  toMarks(): void {

    console.log("witam");
    this.router.navigate(['/marks']);
    console.log("zegnam")
  }

  changePassword() : void{
    console.log("zmien haslo");
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
