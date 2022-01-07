import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { LayoutsService } from '../layouts.service';
import { SharedService } from 'app/shared/shared.service';
import { AppConst } from 'app/app.constant';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  length: any;
  limit: number = AppConst.pageSize;
  dataSource: any;
  dataRecord: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  project_id: any;
  user_type:any
  index: number;
  Userslist:any;
  viewContent: any;
  mainUserType : any;
  subUserType : any ;
  usertypes:any;
  subtypes:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('canvas') canvas: ElementRef;
  isDisable: boolean = true;
  displayedColumns: string[] = ['no', 'username','email','user_type','action'];
  permissions : any =[];
  constructor(public dialog: MatDialog, private layoutsService: LayoutsService, private sharedService: SharedService,public behaviorService: SharedService,private zone: NgZone,private router: Router) {
    this.permissions = JSON.parse(localStorage.getItem('permission'));
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
   }

  ngOnInit() {
    this.getProjectUser();
    this.getUserType();
  }
  // Get User Type
  getUserType() {  
    this.layoutsService.getUserType().subscribe((res: any) => {
      this.mainUserType = res.data[1].children;     
    })
  }
  getProjectUser() {
    this.layoutsService.getProjectUsers(this.limit, this.page, this.sortName, this.sortType, this.searchKey,this.project_id,this.user_type).subscribe((res: any) => {     
      this.length = res.data.totalProjectMembers[0].count;
      if(res.data.totalProjectMembers[0].count > 0) {
        this.dataSource = new MatTableDataSource(res.data.projectMembers[0].user_data);
      } else {
        this.dataSource = new MatTableDataSource();
      }
      // if(res.data.length == 0) {
      //   // this.length = res.data.length
      //   this.dataSource = new MatTableDataSource();
      // } else {
      //   this.dataSource = new MatTableDataSource(res.data[0].user_data);
      // }
      
    })
  }
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getProjectUser();
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
    this.getProjectUser();
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
    this.getProjectUser();
  }
  resetIndex(e) {
    this.index = e;
  }
  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.user_type = '';
    this.usertypes = '';
    this.subtypes = '';
    this.isDisable = true;
    //this.searchKey = '';
    this.getProjectUser();
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.inspectordeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layoutsService.deleteInspector(id).subscribe((res: any) => {
          //this.getListInspectors();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    });
  }
   //userType
   userType(value) {
    if(value === 4) {
      this.user_type = value;
      this.getProjectUser();
      this.subUserType = null;
      this.isDisable = true;
    }else if(value === 5){
      this.subtypes='';
      this.isDisable = false;
      this.subUserType = this.mainUserType[1].children   
    } else if (value === 6) {
      this.subtypes='';
      this.isDisable = false;
      this.subUserType = this.mainUserType[2].children  
    }
  }
  //user Sub Type
  userSubType(value){
    this.user_type = value;
    this.getProjectUser();
  }

  editUser(id){
    this.router.navigate(['/inspectors/edit-inspector/' + id])
  }

  deleteUser(userId){
    let data = {
      project_id : this.project_id,
      user_id : userId
    };
    this.layoutsService.deleteProjectAssignment(data).subscribe((res:any)=>{
      this.sharedService.loggerSuccess(res.message);
      this.getProjectUser();
    })
  }
  /**
   * for popup detail
  * // TODO: viewDetail
  * @param id
  * @returns detail with perticular id
  */
//  viewDetail(id) {
//   if (id) {
//     this.layoutsService.getDrawingDetail(id).subscribe((res: any) => {
//       this.viewContent = res.data;
//       var pngiconx = AppConst.pngiconx;
//       var pngicony = AppConst.pngicony;
//       var seticon = [];
//       this.viewContent.imageData.forEach(el => {
//         el.marker_position_x = +el.marker_position_x - pngiconx;
//         el.marker_position_y = +el.marker_position_y - pngicony;
//         seticon.push({ x: el.marker_position_x, y: el.marker_position_y });
//       });

//       var canvas: HTMLCanvasElement = this.canvas.nativeElement;
//       var context = canvas.getContext('2d');

//       let img1 = new Image();
//       let img2 = new Image();

//       img1.onload = function () {
//         canvas.width = img1.width;
//         canvas.height = img1.height;
//         context.drawImage(img1, 0, 0);
//         img2.src = AppConst.pinImg;
//       };

//       img2.onload = function () {
//         // for (var i = 0; i <= seticon.length; i += 1) {
//         //   context.drawImage(img2, seticon[i].x, seticon[i].y);
//         // }
//         seticon.forEach(element => {
//           context.drawImage(img2, element.x, element.y);
//         });
//       };

//       img1.src = this.viewContent.drawing.cad_image;
      
//     })
//   }
//  }
}
