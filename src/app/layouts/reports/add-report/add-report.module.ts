import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReportComponent } from './../add-report/add-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: AddReportComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AddReportComponent]
})
export class AddReportModule { }
