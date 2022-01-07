import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUsersComponent } from './project-users.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { MatDividerModule } from '@angular/material';
import { MatTabsModule, MatDatepickerModule, MatButtonModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  { path: '', component: ProjectUsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule
  ],
  declarations: [ProjectUsersComponent]
})
export class ProjectUsersModule { }
