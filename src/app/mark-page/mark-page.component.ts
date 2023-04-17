import {Component, OnInit} from '@angular/core';
import {Mark, MarkService} from "../user-service/mark.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeService, Student, StudentDTO} from "../user-service/grade-service";
import {popNumber} from "rxjs/internal/util/args";

@Component({
  selector: 'app-mark-form',
  templateUrl: './mark-page.component.html',
  styleUrls: ['./mark-page.component.css']
})
export class MarkPageComponent implements OnInit{

  username! :string;
  markNote!:string;
  markValue!: number;

  submitted = false;
  students!:StudentDTO[];
  grade!:number;

  constructor(private markService: MarkService, private gradeService: GradeService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const grade = this.route.snapshot.queryParamMap.get('grade')!;
    this.grade= parseInt(grade);
    this.students = await this.gradeService.getStudentsByGrade(this.grade);
  }



  onSubmit(login: string, markNote: string, markValue: number): void {

    this.markService.saveMark(login, this.markValue,this.markNote)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMark(): void {
    this.submitted = false;


  }

}
