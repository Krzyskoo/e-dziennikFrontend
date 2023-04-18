import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GradeDTO, UserDTO} from "./grade-service";
@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private baseUrl = 'http://localhost:8080/subject/mark/';

  constructor(private http: HttpClient) { }

  saveMark(username: string, markValue:number, markNote:string): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const mark = {
      markNote: markNote,
      markValue: markValue,
      student: { login: username },
      teacher: { user: { id: localStorage.getItem('id') } }


    }

    return this.http.post(`${this.baseUrl}${username}`, mark, requestOptions);
  }

}
export class Mark {
  id?: number;
  markNote!: string;
  markValue!: number;
  student!: {
    id: number;
    studentName: string;
    studentSurname: string;
  };
  teacher!: {
    id: number;
    teacherName: string;
    teacherSurname: string;
    subject: string;
  };
}
export class StudentDTO_mark {
  id!: number;
  studentName!: string;
  studentSurname!: string;
  grade!: GradeDTO;
  user!: UserDTO;
  markNote!:string;
  markValue!:number;

}
