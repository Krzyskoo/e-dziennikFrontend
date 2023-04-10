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
import { StudentModel, StudentService } from './service/student.service';
import { NoteModel, NoteService } from './service/note.service';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  {
    path: 'user', component: UserPageComponent,
    children: [
      { path: 'marks', component: UserMarksComponent, canActivate: [LoginGuard] }, 
      { path: 'notes', component: UserNotesComponent, canActivate: [LoginGuard] }
    ], canActivate: [LoginGuard]
  },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserPageComponent,
    UserMarksComponent,
    UserNotesComponent,
    DialogChangePasswordComponent
  ],
  entryComponents: [
    DialogChangePasswordComponent
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
    MatExpansionModule

  ],
  providers: [NoteModel, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
