import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { AddDrawingComponent } from './../add-drawing/add-drawing.component';

const routes: Routes = [
  { path: '', component: AddDrawingComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AddDrawingComponent]
})
export class AddDrawingModule { }
