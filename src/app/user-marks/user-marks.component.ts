import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MarkService, SubjectModel } from '../service/mark.service';


@Component({
  selector: 'app-user-marks',
  templateUrl: './user-marks.component.html',
  styleUrls: ['./user-marks.component.scss'], 
  encapsulation: ViewEncapsulation.None
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
