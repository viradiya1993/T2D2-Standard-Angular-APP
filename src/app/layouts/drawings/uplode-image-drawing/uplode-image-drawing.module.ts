import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UplodeImageDrawingComponent } from './uplode-image-drawing.component';
import { SharedModule } from './../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

const routes : Routes = [
  {path:'' , component:UplodeImageDrawingComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  declarations: [UplodeImageDrawingComponent]
})
export class UplodeImageDrawingModule { }
