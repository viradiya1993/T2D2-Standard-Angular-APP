import { Component, OnInit, NgZone } from '@angular/core';
import { LayoutsService } from '../layouts.service';
import { SharedService } from 'app/shared/shared.service';
import { Router } from '@angular/router';
// import * as Chartist from 'chartist';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  projectid = JSON.parse(localStorage.getItem("_projectid"));
  Data = { project_id : this.projectid };
  constructor(private layoutsService: LayoutsService,public behaviorService: SharedService,private zone: NgZone,private router: Router) {
    if(!this.projectid === null || this.projectid === undefined || !this.projectid){
      this.zone.run(() => { this.router.navigate(['/projectlist']) })
    }
   }

  ngOnInit() {
    this.getDashboardData();
  }

  /**
  * get dashboard count
 * // TODO: getDashboardData
 * @returns count of dashboard
 */
  getDashboardData() {
    // this.layoutsService.getDashboardCount().subscribe((res: any) => {
    //   this.dashboardData = res.data;
    // })
    this.layoutsService.getDashboard(this.Data).subscribe((res: any) => {
      this.dashboardData = res.data;
    })
  }
}
