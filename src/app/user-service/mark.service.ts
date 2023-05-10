import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private baseUrl = "http://localhost:8080";
  constructor(private http : HttpClient) { }

  async getMarks(): Promise<SubjectModel[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await this.http.get<SubjectModel[]>(`${this.baseUrl}/subjects/marks`, requestOptions).toPromise();
    if (!result) {
      return [];
    }

    return result;
  }

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

    return this.http.post(`${this.baseUrl}/subject/mark/${username}`, mark, requestOptions);
  }
}

export class SubjectModel{
  subject!: string;
  marks!: MarkModel[];
}

export class MarkModel{
  markNote!: string;
  markValue!: number;
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
// export class StudentDTO_mark {
//   id!: number;
//   studentName!: string;
//   studentSurname!: string;
//   grade!: GradeDTO;
//   user!: UserDTO;
//   markNote!:string;
//   markValue!:number;

// }
