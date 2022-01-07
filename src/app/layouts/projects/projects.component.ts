import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { AppConst } from './../../app.constant';
import { MatDialog, MatPaginator } from '@angular/material';
import { DeleteBoxComponent } from './../../shared/delete-box/delete-box.component'
import { MatSort, MatTableDataSource } from '@angular/material';
import { LayoutsService } from './../layouts.service';
import { SharedService } from './../../shared/shared.service';
import * as moment from 'moment';
declare var jQuery: any;


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  start_date: any;
  end_date: any;
  dataSource: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  viewContent: any;
  sDate: any;
  eDate: any;
  index: number;
  displayedColumns: string[] = ['no', 'project_id', 'project_name', 'start_date', 'end_date', 'action'];
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog, private layoutsService: LayoutsService, private sharedService: SharedService) { }

  ngOnInit() {
    this.getListProjects();
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
   * for filter date 
 * // TODO: filterDate
 * @returns list of projects releted to startdate , enddate
 */
  filterDate() {
    if (this.start_date !== undefined && this.end_date !== undefined && this.start_date !== '' && this.end_date !== '') {
      this.page = 0;
      this.sDate = moment(this.start_date).format("x")
      this.eDate = moment(this.end_date).format("x")
      this.getListProjects();
    }
  }

  /**
    * for reset filter date 
  * // TODO: resetFilter
  * @returns list of projects releted to startdate , enddate
  */
  resetFilter() {
    this.start_date = '';
    this.end_date = '';
    this.sDate = '';
    this.eDate = '';
    this.page = 0;
    this.index = 0;
    this.getListProjects();
  }

  /**
  * for hide toggel after closeModel popup
  * // TODO: closeModel
  * @returns replace html class
  */
  closeModel(id , id2){
    var n = document.getElementById(id);
    var n1 = document.getElementById(id2);
    n.setAttribute('aria-expanded', 'false');
    jQuery(n).addClass('collapsed');
    jQuery(n1).removeClass('show');
  }
  
  /**
  * for serching table
  * // TODO: receiveSearchValue
  * @returns list of project related to search
  */
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getListProjects();
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
    this.getListProjects();
  }

  /**
   * get list of inspectors
  * // TODO: getListInspectors
  * @returns list of inspectors
  */
  getListProjects() {
    this.layoutsService.getProjects(this.limit, this.page, this.sortName, this.sortType, this.searchKey, this.sDate, this.eDate)
    .subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data.projects);
      this.length = res.data.totalProjects;
      console.log(res);
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
    this.getListProjects();
  }

  /**
   * for popup detail
  * // TODO: viewDetail
  * @param id
  * @returns detail with perticular id
  */
  viewDetail(id: any) {
    jQuery('#viewModel').modal({
      backdrop: 'static',
      keyboard: false  // to prevent closing with Esc button (if you want this too)
  })
    this.layoutsService.getProjectDetail(id).subscribe((res: any) => {
      this.viewContent = res.data;
    })
  }

  /**
   * for delete projects
  * // TODO: openDialog
  * @param id
  * @returns message
  */
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
