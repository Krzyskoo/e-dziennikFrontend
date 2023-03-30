import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentModel, StudentService } from '../user-service/student.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  student: StudentModel = new StudentModel();

  constructor(private studentService: StudentService, private router: Router) {

  }

  ngOnInit(): void {

  }

  async studentLogin() {
    try {
      const result = await lastValueFrom(this.studentService.loginStudent(this.student));

      const payload = result.token.split('.')[1];
      const base64 = atob(payload);
      const tokenObject = JSON.parse(base64);
      
      localStorage.setItem('token', result.token);
      localStorage.setItem('login', tokenObject.iss);
      localStorage.setItem('role', tokenObject.role);

      this.router.navigate(['/user']);
    } catch {
      alert("Sorry")
    }
  }

}

