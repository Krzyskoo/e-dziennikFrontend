import {Component, OnInit} from '@angular/core';
import {NoteModel, StudentModel, StudentService} from "../user-service/student.service";
import {TeacherService} from "../user-service/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../user-service/note.service";

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit{

  studentId!: number;
  noteContent!: string;
  kindOfNote!:boolean;

  constructor(private route: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
    });
  }

  onSubmit() {
    this.noteService.createNoteForStudent(this.studentId, this.noteContent, this.kindOfNote).subscribe(() => {
      console.log('Note created successfully');
    }, (error) => {
      console.log('Error creating note:', error);
    });
  }

}
