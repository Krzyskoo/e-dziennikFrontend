import { Component, OnInit } from '@angular/core';
import { TeacherModel, TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-user-teachers',
  templateUrl: './user-teachers.component.html',
  styleUrls: ['./user-teachers.component.scss']
})
export class UserTeachersComponent implements OnInit{
  teachers: TeacherModel [] = [];
  constructor(private teacherService: TeacherService){}

  async ngOnInit(){
    this.teachers = await this.teacherService.getTeachers(localStorage.getItem('login')!);
    console.log(this.teachers)
  }
}
