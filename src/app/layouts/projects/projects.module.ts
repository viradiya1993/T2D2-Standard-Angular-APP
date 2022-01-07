import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'add-project', loadChildren: './add-project/add-project.module#AddProjectModule' },
  { path: 'edit-project/:id', loadChildren: './add-project/add-project.module#AddProjectModule' },
  { path: 'uplode-image-project/:id', loadChildren: './uplode-image-project/uplode-image-project.module#UplodeImageProjectModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
  ],
  declarations: [ProjectsComponent],
  providers: [DatePipe]
})
export class ProjectsModule { }
