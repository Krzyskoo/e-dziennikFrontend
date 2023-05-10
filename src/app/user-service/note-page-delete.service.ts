import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student, Teacher} from "./grade-service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class NotePageDeleteService{
  private baseUrl= 'http://localhost:8080'


  constructor(private http: HttpClient) {
  }
  public async getNotesCreatedByTeacher(): Promise<Note[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    var result = await this.http.get<Note[]>(`${this.baseUrl}/note/teacher`, requestOptions).toPromise();
    if (!result) {
      return [];
    }
    return result;
  }
  public async deleteNote(id:number): Promise<void> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
     await this.http.delete<Note[]>(`${this.baseUrl}/note/${id}`, requestOptions).toPromise();

  }
}
export class Note {
  id!: number;
  content!: string;
  date!: Date;
  type!: boolean;
  student!: string;
  teacher!: string;
}
