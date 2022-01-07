import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  { path: '', component: EditProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
  declarations: [EditProfileComponent]
})
export class EditProfileModule { }
