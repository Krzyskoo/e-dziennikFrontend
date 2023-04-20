import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginGuard } from './login-guard/login.guard';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserMarksComponent } from './user-marks/user-marks.component';
import { MatMenuModule} from '@angular/material/menu';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { NoteModel, StudentModel, StudentService } from './user-service/student.service';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { NotePageComponent } from './note-page/note-page.component';
import { GradePageComponent } from './grade-page/grade-page.component';
import {TeacherPageComponent} from "./teacher-page/teacher-page.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MarkPageComponent} from "./mark-page/mark-page.component";
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { MarkDeleteComponent } from './mark-delete/mark-delete.component';


const routes: Routes = [
  { path: '', component: UserLoginComponent },
  {
    path: 'user', component: UserPageComponent,
    children: [
      { path: 'marks', component: UserMarksComponent, canActivate: [LoginGuard] },
      { path: 'notes', component: UserNotesComponent, canActivate: [LoginGuard] }
    ], canActivate: [LoginGuard]
  },
  { path: 'teacher', component: TeacherPageComponent,
    children:[
      { path: 'grade', component: GradePageComponent, canActivate: [LoginGuard] },
      { path: 'note', component: NotePageComponent, canActivate: [LoginGuard] },
      { path: 'mark', component: MarkPageComponent, canActivate: [LoginGuard] },
      { path: 'noteDelete', component: NoteDeleteComponent, canActivate: [LoginGuard] },
      { path: 'markDelete', component: MarkDeleteComponent, canActivate: [LoginGuard] }



    ],
    canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserPageComponent,
    UserMarksComponent,
    UserNotesComponent,
    NotePageComponent,
    GradePageComponent,
    TeacherPageComponent,
    MarkPageComponent,
    NoteDeleteComponent,
    MarkDeleteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatOptionModule,
    MatSelectModule

  ],
  providers: [NoteModel, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
