import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UplodeImageProjectComponent } from './uplode-image-project.component';
import { SharedModule } from './../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

const routes : Routes = [
  {path:'' , component:UplodeImageProjectComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  declarations: [UplodeImageProjectComponent]
})
export class UplodeImageProjectModule { }
