import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {StudentDTO} from "./grade-service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8080/note';

  constructor(private http: HttpClient) { }

  createNoteForStudent(id: number, noteContent: string, kindOfNote:boolean): Observable<any> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const note = {
      noteContent: noteContent,
      student: { id: id },
      teacher: { user: { id: localStorage.getItem('id') } },
      kindOfNote: kindOfNote
    };

    return this.http.post(`${this.apiUrl}/${id}`, note, requestOptions);
  }
  async getStudentsByGrade(gradeId:number): Promise<StudentDTO[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    var result = await this.http.get<StudentDTO[]>(`${this.apiUrl}/students/grade/${gradeId}`, requestOptions).toPromise();
    if (!result) {
      return [];
    }
    return result;
  }
}

