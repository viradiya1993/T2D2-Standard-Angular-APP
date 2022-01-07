import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewDetailComponent } from './../view-detail/view-detail.component';
import { SharedModule } from './../../../shared/shared.module';


const routes : Routes = [
  { path : '', component:ViewDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ViewDetailComponent]
})
export class ViewDetailModule { }
