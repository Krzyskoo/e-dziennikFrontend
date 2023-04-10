import {Component, OnInit} from '@angular/core';
import {NoteModel, StudentModel, StudentService} from "../user-service/student.service";
import {TeacherService} from "../user-service/teacher.service";

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit{

  constructor(private studentService: StudentService, private noteModel: NoteModel) {
  }
  note : NoteModel= new NoteModel();
  student : StudentModel[] = [] ;
  teacher : StudentModel[]= [];


  async ngOnInit() {
    this.student = await this.studentService.getStudents();
    console.log(this.student)
    this.teacher = await this.studentService.getTeachers();
  }

  onSubmit() {
    this.studentService.saveNote(this.note).then(note => {
      console.log('Note added:', note);
      this.note = new NoteModel();
    })
      .catch(error => console.error('Error adding note:', error));;

  }
}
