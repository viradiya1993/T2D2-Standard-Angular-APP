import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddImageComponent } from './add-image.component'
import { SharedModule } from './../../../shared/shared.module';

const routes : Routes = [
  { path : '', component:AddImageComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [AddImageComponent]
})
export class AddImageModule { }
