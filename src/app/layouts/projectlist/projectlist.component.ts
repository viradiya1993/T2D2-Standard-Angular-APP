import { Component, Input, Output, OnInit, EventEmitter, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { AppConst } from 'app/app.constant';
import { LayoutsService } from 'app/layouts/layouts.service';
import { DeleteBoxComponent } from './../../shared/delete-box/delete-box.component';
import * as moment from 'moment';
import { SharedService } from 'app/shared/shared.service';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent implements OnInit { 
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  start_date: any;
  end_date: any;
  dataSource: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  sDate: any;
  eDate: any;
  index: number;
  newlist: any;
  permissions : any =[];
  constructor(private layoutsService: LayoutsService, public behaviorService: SharedService, private zone: NgZone, private router: Router,
    public dialog: MatDialog,public sharedService: SharedService) {
    this.permissions = JSON.parse(localStorage.getItem('permission'));
  }

  ngOnInit() {
    this.getListProjects();
  }
  getListProjects() {
    this.layoutsService.getProjects(this.limit, this.page, this.sortName, this.sortType, this.searchKey, this.sDate, this.eDate).subscribe((res: any) => {
      this.newlist = res.data.projects;
      this.length = res.data.totalProjects;
    })
  }
  sortItem(sortItem) {
    this.sortName = sortItem;
    if (this.sortType === 'desc') {
      this.sortType = 'asc';
    } else if (this.sortType === 'asc') {
      this.sortType = 'desc';
    }
    this.getListProjects();
  }
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getListProjects();
    }
  }
  resetIndex(e) {
    this.index = e;
  }
  resetFilter() {
    this.start_date = '';
    this.end_date = '';
    this.sDate = '';
    this.eDate = '';
    this.page = 0;
    this.index = 0;
    //this.searchKey = '';
    this.getListProjects();
  }
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getListProjects();
  }
  filterDate() {
    if (this.start_date !== undefined && this.end_date !== undefined && this.start_date !== '' && this.end_date !== '') {
      this.page = 0;
      this.sDate = moment(this.start_date).format("x")
      this.eDate = moment(this.end_date).format("x")
      this.getListProjects();
    }
  }

  getproject(value) {
    this.behaviorService.ChangeSidebar(value);
    localStorage.setItem('_projectid', JSON.stringify(value._id));
    this.zone.run(() => { this.router.navigate(['/dashboard']) });
  }

  goToProject() {
    this.router.navigate(['projects/add-project']);
  }

  deleteProject(projectId) {
    console.log(projectId);
    
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.projectdeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layoutsService.deleteProject(id).subscribe((res: any) => {
          this.getListProjects();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    });
  }
}
