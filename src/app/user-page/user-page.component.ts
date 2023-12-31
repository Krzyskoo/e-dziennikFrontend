import { Component, OnInit } from '@angular/core';
import { StudentModel, StudentService } from '../user-service/student.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  currentUrl = '';

  constructor(private studentService: StudentService, public router: Router, public dialog: MatDialog) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((x) => {
        this.currentUrl = (x as NavigationEnd).url;
      });
  }

  async ngOnInit(): Promise<void> {
    this.students = await this.studentService.getStudents();
  }

  students: StudentModel[] = [];
  displayColumns: string[] = ['name'];

  get getName() {
    return localStorage.getItem('login');
  }

  changePassword(): void {
    this.dialog.open(DialogChangePasswordComponent, { data: { username: localStorage.getItem('login') } });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
