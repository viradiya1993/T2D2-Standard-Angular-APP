import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './images.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatCardModule, MatTabsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSelectModule, MatTableModule, MatDividerModule } from '@angular/material';


const routes: Routes = [
  { path: '', component: ImagesComponent },
  { path: 'edit-image/:id', loadChildren:'./add-image/add-image.module#AddImageModule' },
  { path: 'view-detail/:id', loadChildren:'./view-detail/view-detail.module#ViewDetailModule' },
  { path: 'upload-images', loadChildren:'./file-upload-form/file-upload-form.module#FileUploadModule' },
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
    MatCardModule
  ],
  declarations: [ImagesComponent]
})
export class ImagesModule { }
