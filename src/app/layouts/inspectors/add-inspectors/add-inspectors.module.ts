import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddInspectorsComponent } from './add-inspectors.component';
import { SharedModule } from './../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: AddInspectorsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AddInspectorsComponent]
})
export class AddInspectorsModule { }
