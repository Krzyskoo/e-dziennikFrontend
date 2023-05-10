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
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserMarksComponent } from './user-marks/user-marks.component';
import { MatMenuModule} from '@angular/material/menu';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { StudentModel, StudentService } from './user-service/student.service';
import { NoteModel, NoteService } from './user-service/note.service';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserTeachersComponent } from './user-teachers/user-teachers.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';import { DialogContentExampleDialogNote, NotePageComponent } from "./note-page/note-page.component";
import { GradePageComponent } from './grade-page/grade-page.component';
import {TeacherPageComponent} from "./teacher-page/teacher-page.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DialogContentExampleDialog, MarkPageComponent} from "./mark-page/mark-page.component";
import { DialogContentExampleDialogDeleteNote, NoteDeleteComponent } from "./note-delete/note-delete.component";
import { DialogContentExampleDialog2, MarkDeleteComponent } from "./mark-delete/mark-delete.component";
import {MatDialogModule} from "@angular/material/dialog";


const routes: Routes = [
  { path: '', component: UserLoginComponent },
  {
    path: 'student', component: UserPageComponent,
    children: [
      { path: 'marks', component: UserMarksComponent, canActivate: [LoginGuard] },
      { path: 'notes', component: UserNotesComponent, canActivate: [LoginGuard] }, 
      { path: 'teachers', component: UserTeachersComponent, canActivate: [LoginGuard] }, 
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
  { path: '**', redirectTo: 'student' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserPageComponent,
    UserMarksComponent,
    UserNotesComponent,
    DialogChangePasswordComponent,
    UserTeachersComponent,
    TeacherPageComponent,
    NotePageComponent,
    GradePageComponent,
    MarkDeleteComponent, 
    TeacherPageComponent,
    MarkPageComponent,
    NoteDeleteComponent,
    DialogContentExampleDialog,
    DialogContentExampleDialog2,
    DialogContentExampleDialogNote,
    DialogContentExampleDialogDeleteNote
  ],
  entryComponents: [
    DialogChangePasswordComponent,
    // NotePageComponent,
    // GradePageComponent,
    // TeacherPageComponent,
    // MarkPageComponent,
    // NoteDeleteComponent,
    // MarkDeleteComponent,
    // DialogContentExampleDialog,
    // DialogContentExampleDialog2,
    // DialogContentExampleDialogNote,
    // DialogContentExampleDialogDeleteNote
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
    MatPaginatorModule, 
    MatDialogModule, 
    MatExpansionModule, 
    MatTooltipModule, 
    MatSnackBarModule, 
    MatGridListModule, 
    MatAutocompleteModule, 
    ReactiveFormsModule, 
    MatSelectModule
  ],
  providers: [NoteModel, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
