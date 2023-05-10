import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async getStudents(): Promise<StudentModel[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await this.http.get<StudentModel[]>(`${this.baseUrl}/students`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }

  loginStudent(student: StudentModel): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.baseUrl}/login`, student);
  }

  async getMarks(username: string): Promise<[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await this.http.get<[]>(`${this.baseUrl}/marks/${username}`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }

  async changePassword(newPassword: NewPassword): Promise<Observable<string>> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return await this.http.post<string>(`${this.baseUrl}/changePassword`, newPassword, requestOptions);
  }
}


export class StudentModel {
  id!: number;
  login!: string;
  password!: string;
}

export class AuthResult {
  token!: string;
}

export class NewPassword {
  login!: string;
  password!: string;
}

