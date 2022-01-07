import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AppConst } from './../../app.constant';
import { MatDialog } from '@angular/material';
import { DeleteBoxComponent } from './../../shared/delete-box/delete-box.component'
import { MatSort, MatTableDataSource } from '@angular/material';
import { LayoutsService } from './../layouts.service';
import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  project_id: any;
  displayedColumns: string[] = ['no', 'report_name', 'created_at', 'pdf', 'action'];
  permissions : any =[];
  @ViewChild(MatSort) sort: MatSort;
  index: number;


  constructor(public dialog: MatDialog, private layoutsService: LayoutsService, private sharedService: SharedService,public behaviorService: SharedService,private zone: NgZone,private router: Router) { 
    this.behaviorService.ChangeSide$.subscribe(result => {
      if(result) {
        this.project_id = result._id;
      } else if(result == null) {
        this.project_id = JSON.parse(localStorage.getItem("_projectid"));
      }
    });
    if(!this.project_id === null || this.project_id === undefined || !this.project_id){
      this.zone.run(() => { this.router.navigate(['/projectlist']) })
    }
    this.permissions = JSON.parse(localStorage.getItem('permission'));
  }

  ngOnInit() {
    //this.getListReports();
    this.getReportsList();
  }

  /**
 * for serching table
 * // TODO: receiveSearchValue
 * @returns list of report related to search
 */
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      //this.getListReports();
      this.getReportsList();
    }
  }
  /**
     * for pagination
    * // TODO: receiveMessage
    * @param event
    */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    //this.getListReports();
    this.getReportsList();
  }

  /**
    * for search after page goto 1
   * // TODO: resetIndex
   * @param event
   */
  resetIndex(e) {
    this.index = e;
  }

  /**
   * get list of inspectors
  * // TODO: getListInspectors
  * @returns list of inspectors
  */
  getListReports() {
    // this.layoutsService.getReports(this.limit, this.page, this.sortName, this.sortType, this.searchKey).subscribe((res: any) => {
    //   this.dataSource = new MatTableDataSource(res.data.reports);
    //   this.length = res.data.totalReports;
    // })
  }

  /**
   * get report for user
   * 
   */
  getReportsList() {
    this.layoutsService.getReportsList(this.limit, this.page, this.sortName, this.sortType, this.searchKey,this.project_id).subscribe((res: any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.data.reports);
      this.length = res.data.totalReports;
    })
  }
  /**
   * for shorting table value
  * // TODO: sortItem
  * @param sortItem
  * @returns asc , desc
  */
  sortItem(sortItem) {
    this.sortName = sortItem;
    if (this.sortType === 'desc') {
      this.sortType = 'asc';
    } else if (this.sortType === 'asc') {
      this.sortType = 'desc';
    }
    //this.getListReports();
    this.getReportsList();
  }

  /**
  * for delete reports
 * // TODO: openDialog
 * @param id
 * @returns message
 */
  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.reportdeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layoutsService.deleteReport(id).subscribe((res: any) => {
          //this.getListReports();
          this.getReportsList();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    });
  }
}
