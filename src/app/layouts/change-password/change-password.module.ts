import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  { path: '', component: ChangePasswordComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
