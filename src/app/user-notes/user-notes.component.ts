import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NoteModel } from '../user-service/note.service';
import { NoteService } from '../user-service/note.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit{
  studentNotes : NoteModel[] = [];
  filteredStudentNotes : NoteModel[] = [];
  notes: NoteModel[] = [];
  show: boolean = false;
  showAll: boolean = false;
  clicked: boolean = false;

  constructor(private noteService: NoteService){
  }

  async ngOnInit() {
   this.notes = await this.noteService.getNotes();

   console.log(this.studentNotes);
  }

  getFilteredNotes(typeNote: boolean){
    this.filteredStudentNotes = this.notes.filter(x=> x.type == typeNote);
    this.show = true;
    this.showAll = false;
    this.clicked = true;
  }

  getAllNotes(){
    console.log('siemka')
    this.studentNotes = this.notes;
    this.showAll = true;
    this.show = false;
    this.clicked = true;
  }

}
