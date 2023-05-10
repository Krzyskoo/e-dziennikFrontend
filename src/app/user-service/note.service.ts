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
}

export class NoteModel{
  content!: string;
  teacher!: string;
  date!: string;
  type!: boolean;
}