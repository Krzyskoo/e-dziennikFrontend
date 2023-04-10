import { Component, OnInit } from '@angular/core';
import { NoteModel } from '../service/note.service';
import { NoteService } from '../service/note.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit{
  studentNotes : NoteModel[] = [];
  constructor(private noteService: NoteService){
  }

  async ngOnInit() {
   const notes = await this.noteService.getNotes(localStorage.getItem('login')!);
   this.studentNotes = notes;

   console.log(this.studentNotes);
  }

  
}
