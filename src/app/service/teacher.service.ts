import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  async getTeachers(username: string): Promise<TeacherModel[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result = await lastValueFrom(this.http.get<TeacherModel[]>(`${this.baseUrl}/teachers`, requestOptions));
    if (!result) {
      return [];
    }

    return result;
  }



}

export class TeacherModel{
  teacherName!: string;
  teacherSurname!: string;
  telephone!: string;
  classroom!: string;
  teacherInfo!: string;
}

export class OneTeacherModel{
  teacherFullName!: string;
}

