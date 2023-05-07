import {Component, OnInit} from '@angular/core';
import {NoteModel, StudentModel, StudentService} from "../user-service/student.service";
import {TeacherService} from "../user-service/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../user-service/note.service";
import {Grade, GradeService, StudentDTO} from "../user-service/grade-service";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { DialogContentExampleDialog } from "../mark-page/mark-page.component";

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit{

  student!: StudentDTO[];
  grade!:number;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private gradeService: GradeService, private dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    const grade = this.route.snapshot.queryParamMap.get('grade')!;
    this.grade= parseInt(grade);
    this.student = await this.gradeService.getStudentsByGrade(this.grade);
  }

  onSubmit(studentId: number) {
    const studentItem = this.student.find(student => student.id === studentId);
    // @ts-ignore
    this.noteService.createNoteForStudent(studentId, studentItem.noteContent, studentItem.kindOfNote).subscribe(() => {
      console.log('Note created successfully');
    }, (error) => {
      console.log('Error creating note:', error);
    });
  }
  confirmDialog(id:number): Subscription {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Czy na pewno chcesz zapisać notatke?'
    };
    const dialogRef = this.dialog.open(DialogContentExampleDialogNote, dialogConfig);
    return dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.onSubmit(id);
      }
    });
  }

}
@Component({
  selector: 'dialog-content-example-dialog-note',
  template: `
    <h1 mat-dialog-title>Potwierdzenie</h1>
    <div mat-dialog-content>{{data}}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Anuluj</button>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </div>
  `,
})
export class DialogContentExampleDialogNote {
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialogNote>,) {}
  data: string= 'Potwierdzasz uwstawienie notatki?'
}
