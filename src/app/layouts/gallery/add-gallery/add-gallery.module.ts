import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { AddGalleryComponent } from './add-gallery.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [
  { path: '', component: AddGalleryComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule, 
    HttpClientModule,
    NgxDropzoneModule
    
  ],
  declarations: [AddGalleryComponent]
})
export class AddGalleryModule { }
