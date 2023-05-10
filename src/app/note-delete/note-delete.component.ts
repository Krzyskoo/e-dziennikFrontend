import {Component, OnInit} from '@angular/core';
import {Note, NotePageDeleteService} from "../user-service/note-page-delete.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogContentExampleDialogNote } from "../note-page/note-page.component";

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.scss']
})
export class NoteDeleteComponent implements OnInit{

  notes: Note[]=[];
  displayedColumns: string[] = ['date', 'content', 'student', 'delete'];

  constructor(private notePageDeleteService: NotePageDeleteService, private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.notePageDeleteService.getNotesCreatedByTeacher()
      .then(note => this.notes = note)
      .catch(error => console.log(error))
  }
  async deleteNote(id: number) {
    try {
      await this.notePageDeleteService.deleteNote(id);
      this.notes = this.notes.filter(n => n.id !== id);
    } catch (error) {
      console.log(error);
    }
  }
  confirmDialog(id:number): Subscription {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Czy na pewno chcesz zapisać notatke?'
    };
    const dialogRef = this.dialog.open(DialogContentExampleDialogDeleteNote, dialogConfig);
    return dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.deleteNote(id);
      }
    });
  }

}
@Component({
  selector: 'dialog-content-example-dialog-delete-note',
  template: `
    <h1 mat-dialog-title>Potwierdzenie</h1>
    <div mat-dialog-content>{{data}}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Anuluj</button>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </div>
  `,
})
export class DialogContentExampleDialogDeleteNote {
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialogDeleteNote>,) {}
  data: string= 'Potwierdzasz usuniecie notatki?'
}
