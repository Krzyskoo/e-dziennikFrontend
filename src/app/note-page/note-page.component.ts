import {Component, OnInit} from '@angular/core';
import {NoteModel, StudentModel, StudentService} from "../user-service/student.service";
import {TeacherService} from "../user-service/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../user-service/note.service";
import {Grade, GradeService, StudentDTO} from "../user-service/grade-service";

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit{

  student!: StudentDTO[];
  grade!:number;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private gradeService: GradeService) { }

  async ngOnInit(): Promise<void> {
    const grade = this.route.snapshot.queryParamMap.get('grade')!;
    this.grade= parseInt(grade);
    this.student = await this.gradeService.getStudentsByGrade(this.grade);
  }

  onSubmit(studentId: number) {
    const studentItem = this.student.find(student => student.id === studentId);
    // @ts-ignore
    this.noteService.createNoteForStudent(studentId, studentItem.noteContent, studentItem.kindOfNote).subscribe(() => {
      console.log('Note created successfully');
    }, (error) => {
      console.log('Error creating note:', error);
    });
  }

}
