import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StudentModel} from "./student.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService{
  private baseUrl = "http://localhost:8080";
  constructor(private http : HttpClient) { }

  async getTeachers() : Promise<TeacherModel[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await this.http.get<TeacherModel[]>(`${this.baseUrl}/teachers`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }
  async saveNote(noteModel: NoteModel, username:string) {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.post<NoteModel>(`${this.baseUrl}/notes/${username}`, NoteModel, requestOptions).toPromise();
  }

}
export class TeacherModel{
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
}
