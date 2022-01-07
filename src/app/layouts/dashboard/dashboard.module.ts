import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,MatButtonModule,MatSelectModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
