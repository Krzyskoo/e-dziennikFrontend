import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  async getAllGrades(): Promise<Grade[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    var result = await this.http.get<Grade[]>(`${this.apiUrl}/grades`, requestOptions).toPromise();
    if (!result) {
      return [];
    }
    return result;
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
export class Grade {
  id!: number;
  gradeName!: string;
  students!: Student[];
  teachers!: Teacher[];
}

export class Student {
  id!: number;
  studentName!: string;
  studentSurname!: string;
  user!: User;
  grade!: {
      "id": number;
      "gradeName": string;

  };
}

export class Mark {
  id!: number;
  markNote!: string;
  markValue!: number;
  student!: Student;
  teacher!: Teacher;
}

export class Note {
  id!: number;
  noteContent!: string;
  date!: Date;
  kindOfNote!: boolean;
  student!: Student;
  teacher!: Teacher;
}

export class Teacher {
  id!: number;
  teacherName!: string;
  teacherSurname!: string;
  subject!: string;
  telephone!: string;
  classroom!: string;
  teacherInfo!: string;
  user!: User;
  grades!: Grade[];
  marks!: Mark[];
}

export class User {
  id!: number;
  login!: string;
  password!: string;
  role!: string;
}
export class StudentDTO {
  id!: number;
  studentName!: string;
  studentSurname!: string;
  grade!: GradeDTO;
  user!: UserDTO;
  noteContent!: string; // dodaj pole noteContent
  kindOfNote!: boolean;
  markNote!:string;
  markValue!:number;
}

export class GradeDTO {
  id!: number;
}
export class UserDTO {
  login!: string;
}

