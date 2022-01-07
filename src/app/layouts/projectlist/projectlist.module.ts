import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectlistComponent } from '../projectlist/projectlist.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatDatepickerModule, MatButtonModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
const routes: Routes = [
  { path: '', component: ProjectlistComponent }
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
  declarations: [ProjectlistComponent]
})
export class ProjectlistModule { }
