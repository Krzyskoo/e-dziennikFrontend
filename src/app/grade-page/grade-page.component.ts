import {Component, OnInit} from '@angular/core';
import {Grade, GradeService, Student} from "../user-service/grade-service";
import {Router} from "@angular/router";
import {MarkService} from "../user-service/mark.service";

@Component({
  selector: 'app-grade-page',
  templateUrl: './grade-page.component.html',
  styleUrls: ['./grade-page.component.scss']
})
export class GradePageComponent implements OnInit{

  grades!: Grade[];
  students!:Student[]

  constructor(private gradeService: GradeService, private router: Router) {}

  ngOnInit() {
    this.gradeService.getAllGrades()
      .then(grades => this.grades = grades)
      .catch(error => console.log(error))


  }
  onGradeClicked(grade: Grade) {
    console.log(`Clicked on grade: ${grade.gradeName}`);
    // do something with the selected grade
  }
  sendStudentsFromClass(gradeId: number) {
    this.router.navigate(['/teacher/mark'], { queryParams: { grade: gradeId } });
  }
  sendStudentFromClassToNote(gradeId : number){
    this.router.navigate(['teacher/note'],{queryParams:{grade: gradeId}});
  }

}
