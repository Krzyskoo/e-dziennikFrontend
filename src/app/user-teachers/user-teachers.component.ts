import { Component, OnInit } from '@angular/core';
import { OneTeacherModel, TeacherModel, TeacherService } from '../user-service/teacher.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-user-teachers',
  templateUrl: './user-teachers.component.html',
  styleUrls: ['./user-teachers.component.scss']
})
export class UserTeachersComponent implements OnInit {
  teachers: TeacherModel[] = [];
  teachersNames: string[] = [];

  filterValue: string = "";
  filteredTeachersNames: string[] = [];

  selected: boolean = false;
  selectedTeacher: TeacherModel = new TeacherModel;
  
  constructor(private teacherService: TeacherService){}

  async ngOnInit(){
    this.teachers = await this.teacherService.getTeachers(localStorage.getItem('login')!);
    this.teachersNames = this.teachers.map(x => (`${x.teacherName} ${x.teacherSurname}`));
    this.filteredTeachersNames = this.teachersNames;
  }

  onChange(value: any) {
    if (!value) {
      this.filteredTeachersNames = this.teachersNames;
      return;
    }

    this.filteredTeachersNames = this.filteredTeachersNames.filter(x => x.toLowerCase()
      .includes(value.toLowerCase()));
  }

  onSelect(name: string) {
    this.selected = true;
    this.selectedTeacher = this.teachers.find(x => (`${x.teacherName} ${x.teacherSurname}`) === name)!;
    console.log(this.selectedTeacher);

    this.filterValue = "";
    this.filteredTeachersNames = this.teachersNames;
  }

}