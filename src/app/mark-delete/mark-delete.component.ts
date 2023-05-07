import {Component, OnInit} from '@angular/core';
import {Mark, MarkDeleteService} from "../user-service/mark-delete.service";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { DialogContentExampleDialog } from "../mark-page/mark-page.component";

@Component({
  selector: 'app-mark-delete',
  templateUrl: './mark-delete.component.html',
  styleUrls: ['./mark-delete.component.scss']
})
export class MarkDeleteComponent implements OnInit {

  marks: Mark[] = [];
  displayedColumns = ['markNote', 'markValue', 'student', 'teacher', 'delete'];

  constructor(private markDeleteService: MarkDeleteService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.markDeleteService.getGradeCreatedByTeacher()
      .then(mark => this.marks = mark)
      .catch(error => console.log(error))
  }

  async deleteMark(id: number) {
    try {
      await this.markDeleteService.markDelete(id);
      this.marks = this.marks.filter(n => n.id !== id);
    } catch (error) {
      console.log(error);

    }
  }
  confirmDialog(id:number): Subscription {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Czy na pewno chcesz usunac ocene?'
    };
    const dialogRef = this.dialog.open(DialogContentExampleDialog2, dialogConfig);
    return dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deleteMark(id);
      }
    });
  }

}
@Component({
  selector: 'dialog-content-example-dialog2',
  template: `
    <h1 mat-dialog-title>Potwierdzenie</h1>
    <div mat-dialog-content>{{data}}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Anuluj</button>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </div>
  `,
})
export class DialogContentExampleDialog2 {
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog2>,) {}
  data: string= 'Potwierdzasz usunięcie oceny?'
}
