import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatDatepickerModule, MatButtonModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { GalleryComponent } from './gallery.component';
import { DndDirective } from './dnd.directive';




const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'add-gallery', loadChildren: './add-gallery/add-gallery.module#AddGalleryModule' },
  { path: 'progress-gallery', loadChildren: './progress-gallery/progress-gallery.module#ProgressGalleryModule' },
];  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    MatDividerModule,
    MatCardModule
  ],
  declarations: [GalleryComponent, DndDirective]
})
export class GalleryModule { }
