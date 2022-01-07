import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from './phone.pipe';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatListModule,
  MatCardModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material';



import { MatIconModule } from '@angular/material/icon';
import { SearchTextboxComponent } from './search-textbox/search-textbox.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DeleteBoxComponent } from './delete-box/delete-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OnlyNumber } from './onlynumber.directive';
import { DateFormatPipe } from './date-format-pipe.pipe'
import { ImageCropperModule } from './../shared/image-cropper/image-cropper.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { RouterModule } from '@angular/router';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ReplaceUnderscorePipe } from './space-remove-pipe.pipe';
import { TruncatePipe } from './string-cut-pipe.pipe';
import { FileDropDirective } from './file-drop.directive';
import { FileUploadProgressbarBoxComponent } from './file-upload-progressbar-box/file-upload-progressbar-box.component';







@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    ImageCropperModule,
    MatCheckboxModule,
    MatStepperModule,
    RouterModule,
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    SearchTextboxComponent,
    PaginationComponent,
    DeleteBoxComponent,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    OnlyNumber,
    DateFormatPipe,
    ImageCropperModule,
    PhonePipe,
    MatCheckboxModule,
    MatStepperModule,
    ImageUploadComponent,
    ImageEditComponent,
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    ReplaceUnderscorePipe,
    TruncatePipe,
    ReactiveFormsModule,
    FileUploadProgressbarBoxComponent
  ],
  entryComponents: [
    DeleteBoxComponent
  ],
  declarations: [SearchTextboxComponent, PaginationComponent, DeleteBoxComponent , OnlyNumber , DateFormatPipe, PhonePipe, ReplaceUnderscorePipe,TruncatePipe, ImageUploadComponent, ImageEditComponent,
                  // FileDropDirective,
                  FileUploadProgressbarBoxComponent
                ]
})
export class SharedModule { }
