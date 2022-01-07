import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DrawingsComponent } from './drawings.component';
import { SharedModule } from './../../shared/shared.module';


const routes: Routes = [
  { path: '', component: DrawingsComponent },
  { path: 'add-drawing', loadChildren: './add-drawing/add-drawing.module#AddDrawingModule' },
  { path: 'edit-drawing/:id', loadChildren: './add-drawing/add-drawing.module#AddDrawingModule' },
  { path: 'uplode-image-drawing/:id/:drawingid', loadChildren: './uplode-image-drawing/uplode-image-drawing.module#UplodeImageDrawingModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DrawingsComponent]
})
export class DrawingsModule { }
