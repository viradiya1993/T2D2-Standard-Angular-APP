import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FileUploadFormComponent } from './file-upload-form.component';
import { FileDropDirective } from 'app/shared/file-drop.directive';


const routes: Routes = [
  { path: '', component: FileUploadFormComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    FileUploadFormComponent,
    FileDropDirective,
  ]
})
export class FileUploadModule { }
