import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent, DialogOverviewExampleDialog } from './add-project.component';
import { SharedModule } from './../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatTabsModule } from '@angular/material/tabs';




const routes: Routes = [
  { path: '', component: AddProjectComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,MatTabsModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyABL_3uGG2ws27JnVmyBeQBHNEW97fePvw'
      apiKey: 'AIzaSyAHczSw14Wr2bC0bGmrTvTv1tsVUhcopHw',
    })
  ],
  declarations: [AddProjectComponent, DialogOverviewExampleDialog],
  entryComponents: [
    DialogOverviewExampleDialog
  ]
})
export class AddProjectModule { }
