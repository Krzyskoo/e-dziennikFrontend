import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../service/student.service';
import { MarkService, SubjectModel } from '../service/mark.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-user-marks',
  templateUrl: './user-marks.component.html',
  styleUrls: ['./user-marks.component.scss']
})
export class UserMarksComponent implements OnInit{
  studentMarks : SubjectModel[] = [];
  constructor(private markService: MarkService){
  }

  async ngOnInit() {
   const marks = await this.markService.getMarks(localStorage.getItem('login')!);
   this.studentMarks = marks;

   console.log(this.studentMarks);
  }

}
