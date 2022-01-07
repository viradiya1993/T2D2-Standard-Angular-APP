import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { SharedModule } from 'app/shared/shared.module';


const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'add-report', loadChildren:'./add-report/add-report.module#AddReportModule'},
  { path: 'edit-report/:id', loadChildren:'./add-report/add-report.module#AddReportModule'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
