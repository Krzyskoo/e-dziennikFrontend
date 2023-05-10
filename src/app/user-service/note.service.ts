import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = "http://localhost:8080";

  constructor(private http : HttpClient) { }

  async getNotes() : Promise<NoteModel[]>{
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    var result = await lastValueFrom(this.http.get<NoteModel[]>(`${this.baseUrl}/notes`, requestOptions));
    if (!result) {
      return [];
    }
    

    return result;
  }

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

    return this.http.post(`${this.apiUrl}/note/${id}`, note, requestOptions);
  }
  async getStudentsByGrade(gradeId:number): Promise<StudentDTO[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    var result = await this.http.get<StudentDTO[]>(`${this.apiUrl}/note/students/grade/${gradeId}`, requestOptions).toPromise();
    if (!result) {
      return [];
    }
    return result;
  }
}

export class NoteModel{
  content!: string;
  teacher!: string;
  date!: string;
  type!: boolean;
}

