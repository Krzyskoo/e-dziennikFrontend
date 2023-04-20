import {Component, OnInit} from '@angular/core';
import {Note, NotePageDeleteService} from "../user-service/note-page-delete.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.scss']
})
export class NoteDeleteComponent implements OnInit{

  notes: Note[]=[]
  constructor(private notePageDeleteService: NotePageDeleteService) {
  }

  ngOnInit(): void {
    this.notePageDeleteService.getNotesCreatedByTeacher()
      .then(note => this.notes = note)
      .catch(error => console.log(error))
  }
  async deleteNote(id: number) {
    try {
      await this.notePageDeleteService.deleteNote(id);
      this.notes = this.notes.filter(n => n.id !== id);
    } catch (error) {
      console.log(error);
    }
  }

}
