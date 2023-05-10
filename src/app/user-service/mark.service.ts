import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

export class SubjectModel{
  subject!: string;
  marks!: MarkModel[];
}

export class MarkModel{
  markNote!: string;
  markValue!: number;
}
