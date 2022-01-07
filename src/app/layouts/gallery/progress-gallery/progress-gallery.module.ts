import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatDatepickerModule, MatButtonModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

import { ProgressGalleryComponent } from './progress-gallery.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
const routes: Routes = [
  { path: '', component: ProgressGalleryComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    NgxDropzoneModule
  ],
  declarations: [ProgressGalleryComponent]
})
export class ProgressGalleryModule { }
