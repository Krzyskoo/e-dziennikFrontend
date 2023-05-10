import {Component, OnInit} from '@angular/core';
import {Mark, MarkService, StudentDTO_mark} from "../user-service/mark.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeService, Note, Student, StudentDTO} from "../user-service/grade-service";
import {popNumber} from "rxjs/internal/util/args";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";



@Component({
  selector: 'app-mark-form',
  templateUrl: './mark-page.component.html',
  styleUrls: ['./mark-page.component.css']
})
export class MarkPageComponent implements OnInit{

  username! :string;
  mark!: Mark[];


  submitted = false;
  students:StudentDTO[]=[];
  grade!:number;
  constructor(private markService: MarkService, private gradeService: GradeService, private route: ActivatedRoute, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    const grade = this.route.snapshot.queryParamMap.get('grade')!;
    this.grade= parseInt(grade);
    this.students = await this.gradeService.getStudentsByGrade(this.grade);
  }



  onSubmit(login: string, markNote:string, markValue:number): void {

    this.markService.saveMark(login, markValue, markNote)
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

  confirmDialog(): Observable<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Czy na pewno chcesz zapisać tę ocenę?'
    };
    const dialogRef = this.dialog.open(DialogContentExampleDialog, dialogConfig);
    return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h1 mat-dialog-title>Potwierdzenie</h1>
    <div mat-dialog-content>{{data}}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Anuluj</button>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </div>
  `,
})
export class DialogContentExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>,) {}
  data: string= 'Potwierdzasz wtsawianie oceny??'
}


