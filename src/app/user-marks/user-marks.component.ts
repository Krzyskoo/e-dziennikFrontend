import { Component, OnInit } from '@angular/core';
import { StudentService } from '../user-service/student.service';

@Component({
  selector: 'app-user-marks',
  templateUrl: './user-marks.component.html',
  styleUrls: ['./user-marks.component.scss']
})
export class UserMarksComponent implements OnInit{
  constructor(private studentService: StudentService){

  }

  async ngOnInit() {
    const marks = await this.studentService.getMarks(localStorage.getItem('login')!);
    console.log(marks);
  }
}
