import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectorsComponent } from './inspectors.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { MatDividerModule } from '@angular/material';
import { MatTabsModule, MatDatepickerModule, MatButtonModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  { path: '', component: InspectorsComponent },
  { path: 'add-inspector', loadChildren: './add-inspectors/add-inspectors.module#AddInspectorsModule' },
  { path: 'edit-inspector/:id', loadChildren: './add-inspectors/add-inspectors.module#AddInspectorsModule' }
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
    
  ],
  declarations: [InspectorsComponent]
})
export class InspectorsModule { }
