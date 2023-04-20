import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MarkDeleteService{
  private baseUrl= 'http://localhost:8080'

  constructor(private http:HttpClient) {
  }
  public async getGradeCreatedByTeacher():Promise<Mark[]>{
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    var result= await this.http.get<Mark[]>(`${this.baseUrl}/mark/teacher`, requestOptions).toPromise();
    if (!result) {
      return [];
    }
    return result;

  }
  public async markDelete(id:number):Promise<void>{
    const headerDict = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    await this.http.delete<Mark[]>(`${this.baseUrl}/mark/teacher/${id}`, requestOptions).toPromise();

  }

}
export class Mark{
  markNote!: string;
  markValue!: number;
  id!: number;
  student!:string;
  teacher!:string;

}
