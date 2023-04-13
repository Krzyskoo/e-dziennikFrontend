import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
