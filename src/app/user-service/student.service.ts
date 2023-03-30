import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = "http://localhost:8080/login";

  constructor(private http : HttpClient) { }

  async getStudents() : Promise<StudentModel[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    var result = await this.http.get<StudentModel[]>(`${this.baseUrl}`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }

  loginStudent(student : StudentModel):Observable<AuthResult>{
    return this.http.post<AuthResult>(`${this.baseUrl}`, student);
  }
}

export class StudentModel{
  id! : number;
  login!: string;
  password!: string;
}

export class AuthResult {
  token!: string;
}