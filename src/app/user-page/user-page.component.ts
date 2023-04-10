import { Component, OnInit } from '@angular/core';
import { StudentModel, StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  constructor(private studentService: StudentService, public router: Router, public dialog: MatDialog) {

  }

  async ngOnInit(): Promise<void> {
    this.students = await this.studentService.getStudents();
    console.log(this.students)
  }

  students : StudentModel[] = [];
  displayColumns : string[] = ['name'];

  get getName(){
    return localStorage.getItem('login');
  }

  changePassword(): void{
    this.dialog.open(DialogChangePasswordComponent, {data: {username: localStorage.getItem('login')}});
  }

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
