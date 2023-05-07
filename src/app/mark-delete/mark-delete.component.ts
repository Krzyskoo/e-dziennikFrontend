import {Component, OnInit} from '@angular/core';
import {Mark, MarkDeleteService} from "../user-service/mark-delete.service";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-mark-delete',
  templateUrl: './mark-delete.component.html',
  styleUrls: ['./mark-delete.component.scss']
})
export class MarkDeleteComponent implements OnInit{

  marks: Mark[]=[];
  displayedColumns = ['markNote', 'markValue', 'student', 'teacher', 'delete'];

  constructor(private markDeleteService:MarkDeleteService) {
  }

  ngOnInit(): void {
    this.markDeleteService.getGradeCreatedByTeacher()
      .then(mark => this.marks= mark)
      .catch(error => console.log(error))
  }

  async deleteMark(id:number){
    try {
      await this.markDeleteService.markDelete(id);
      this.marks = this.marks.filter(n => n.id !== id);
    }catch (error) {
      console.log(error);

    }
  }




}
