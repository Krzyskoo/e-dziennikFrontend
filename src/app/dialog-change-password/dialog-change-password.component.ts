import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewPassword, StudentModel, StudentService } from '../service/student.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit{
  newPassword: NewPassword = new NewPassword();
  confirmLogin!: string;
  notTheSame: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService, public dialogRef: MatDialogRef<DialogChangePasswordComponent>, private _snackBar: MatSnackBar){

  }
  ngOnInit(): void {
  }

  async changePassword() {
      if(this.newPassword.password == this.confirmLogin){
        this.newPassword.login = localStorage.getItem('login')!;
        console.log(this.newPassword);
        await lastValueFrom(await this.studentService.changePassword(this.newPassword));
        console.log("witam");
        this.dialogRef.close();
        this._snackBar.open('Hasło zostało zmienione', '', {
          duration: 2000,     
          panelClass: ["snackBar"]
        });
      } else {
        this.notTheSame = true;
      }
  }
}

