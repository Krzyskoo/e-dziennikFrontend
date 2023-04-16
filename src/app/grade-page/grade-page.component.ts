import {Component, OnInit} from '@angular/core';
import {Grade, GradeService} from "../user-service/grade-service";

@Component({
  selector: 'app-grade-page',
  templateUrl: './grade-page.component.html',
  styleUrls: ['./grade-page.component.scss']
})
export class GradePageComponent implements OnInit{

  grades!: Grade[];

  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    this.gradeService.getAllGrades()
      .then(grades => this.grades = grades)
      .catch(error => console.log(error));
  }
}
