import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = "http://localhost:8080";

  constructor(private http : HttpClient) { }

  async getStudents() : Promise<StudentModel[]> {
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

  loginStudent(student : StudentModel):Observable<AuthResult>{
    return this.http.post<AuthResult>(`${this.baseUrl}/login`, student);
  }

  async getMarks(username : string) : Promise<[]>{
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

  async getNotes(username : string) : Promise<NoteModel[]>{
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await this.http.get<NoteModel[]>(`${this.baseUrl}/notes/${username}`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }
  async getTeachers() : Promise<StudentModel[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await this.http.get<StudentModel[]>(`${this.baseUrl}/teachers`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }
  async saveNote(noteModel: NoteModel) {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = {
      headers: new HttpHeaders
    };
    return this.http.post<NoteModel>(`${this.baseUrl}/note`, NoteModel, requestOptions).toPromise();
  }

}





export class StudentModel{
  id!: number;
  login!: string;
  password!: string;
}

export class AuthResult {
  token!: string;
}

export class NoteModel{
  content!: string;
  teacher!: string;
  date!: string;
  student!: string;
}
