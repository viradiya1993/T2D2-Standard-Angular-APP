import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConst } from './../../app.constant';
import { MatDialog } from '@angular/material';
import { DeleteBoxComponent } from './../../shared/delete-box/delete-box.component';
import { LayoutsService } from './../layouts.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SharedService } from './../../shared/shared.service';

@Component({
  selector: 'app-inspectors',
  templateUrl: './inspectors.component.html',
  styleUrls: ['./inspectors.component.scss']
})

export class InspectorsComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  length: any;
  limit: number = AppConst.pageSize;
  data: any;
  dataSource: any;
  dataRecord: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  index: number;
  Userslist:any;
  user_type:any
  mainUserType : any;
  subUserType : any ;
  usertypes:any;
  subtypes:any;
  permissions : any =[];
  isDisable: boolean = true;
  constructor(private layoutsService: LayoutsService,private router: Router, public dialog: MatDialog,public sharedService: SharedService) {
    this.permissions = JSON.parse(localStorage.getItem('permission'));
   }

  ngOnInit() {
    this.getListInspectors();
    this.getUserType();
  }
  // Get User Type
  getUserType() {  
    this.layoutsService.getUserType().subscribe((res: any) => {
      this.mainUserType = res.data[1].children;     
    })
  }
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getListInspectors();
    }
  }

  resetIndex(e) {
    this.index = e;
  }

  /**
   * for pagination
  * // TODO: receiveMessage
  * @param event
  */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getListInspectors();
  }

  /**
   * get list of inspectors
  * // TODO: getListInspectors
  * @returns list of inspectors
  */
  getListInspectors() {
    this.layoutsService.getInspectors(this.limit, this.page, this.sortName, this.sortType, this.searchKey,this.user_type).subscribe((res: any) => {
      this.Userslist = res.data.users
      this.length = res.data.totalUsers;
    })
  }
  
  onUserType(value) {
    if(value === 4) {
      this.user_type = value;
      this.getListInspectors();
      this.subUserType = null;
      this.isDisable = true;
    }else if(value === 5){
      this.subUserType = this.mainUserType[1].children 
      this.subtypes='';
      this.isDisable = false;
    } else if (value === 6) {
      this.subtypes='';
      this.subUserType = this.mainUserType[2].children  
      this.isDisable = false;
    }
  }

  //user Sub Type
  userSubType(value){
    this.user_type = value;
    this.getListInspectors();
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
    this.getListInspectors();
  }
  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.usertypes = '';
    this.subtypes = '';
    this.user_type = '';
    this.isDisable = true;
    //this.searchKey = '';
    this.getListInspectors();
  }
  /**
   * for delete inspector
  * // TODO: openDialog
  * @param id
  * @returns message
  */
  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.inspectordeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layoutsService.deleteInspector(id).subscribe((res: any) => {
          this.getListInspectors();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    });
  }
}
