import { Component, OnInit } from '@angular/core';
import { StudentService } from '../user-service/student.service';
import { NoteModel } from '../user-service/student.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {
  studentNotes : NoteModel[] = [];
  constructor(private studentService: StudentService, private noteModel: NoteModel){

  }

  async ngOnInit() {
   const notes = await this.studentService.getNotes(localStorage.getItem('login')!);
   this.studentNotes = notes;
   console.log(this.studentNotes);
  }
  

}
