import { Component } from '@angular/core';
import {Mark, MarkService} from "../user-service/mark.service";

@Component({
  selector: 'app-mark-form',
  templateUrl: './mark-page.component.html',
  styleUrls: ['./mark-page.component.css']
})
export class MarkPageComponent {

  username! :string;
  markNote!:string;
  markValue!: number;

  submitted = false;

  constructor(private markService: MarkService) { }

  onSubmit(): void {

    this.markService.saveMark(this.username, this.markValue,this.markNote)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMark(): void {
    this.submitted = false;


  }

}
