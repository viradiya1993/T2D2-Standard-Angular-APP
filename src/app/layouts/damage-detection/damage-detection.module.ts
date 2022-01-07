import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DamageDetectionComponent } from './damage-detection.component';
import { SharedModule } from './../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';


const routes: Routes = [
  { path: '', component: DamageDetectionComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  declarations: [DamageDetectionComponent]
})
export class DamageDetectionModule { }
