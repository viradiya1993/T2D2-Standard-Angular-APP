import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AppConst } from './../../app.constant';
import { MatDialog } from '@angular/material';
import { DeleteBoxComponent } from './../../shared/delete-box/delete-box.component'
import { MatSort, MatTableDataSource } from '@angular/material';
import { LayoutsService } from './../layouts.service';
import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  viewContent: any;
  // displayedColumns: string[] = ['no', 'image','image_count', 'image_name', 'drawing_name', 'project_name', 'action'];
  displayedColumns: string[] = ['no', 'image','image_count', 'image_name', 'drawing_name', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('canvas') canvas: ElementRef;
  project_id: any;
  drawing_id: any;
  projectslist: any[];
  drawinglist: any[];
  index: number;
  imagepath:string;
  currentIndex = 0;
  imageListData : any;
  permissions : any =[];
  
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
    this.getProjectsList();
    this.getListImages();
  }
  /**
   * get Image List 
   */

  /**
  * for serching table
  * // TODO: receiveSearchValue
  * @returns list of images related to search
  */
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getListImages();
    }
  }

  /**
  * for reset filter
  * // TODO: resetFilter
  * @returns list of images 
  */
  resetFilter() {
    this.project_id = '';
    this.drawing_id = '';
    this.page = 0;
    this.index = 0;
    this.drawinglist = [];
    this.getListImages();
  }

  /**
     * for pagination
    * // TODO: receiveMessage
    * @param event
    */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getListImages();
  }

  /**
   * get list of inspectors
  * // TODO: getListImages
  * @returns list of inspectors
  */
  getListImages() {
    this.layoutsService.getImages(this.limit, this.page, this.sortName, this.sortType, this.searchKey, this.project_id, this.drawing_id).subscribe((res: any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.data.images[0].image_data);
      this.length = res.data.totalImages[0].count;
      this.imagepath = res.data.detectedImagePath;
      this.imageListData = res.data.images[0].image_data;
      console.log('imageListData',this.imageListData);
    })
  }

  /**
   * get list of projects
  * // TODO: getProjectsList
  * @returns list of projects
  */
  getProjectsList() {
    this.layoutsService.getProjectList().subscribe((res: any) => {
      this.projectslist = res.data;
      //console.log(this.projectslist);
    })
  }

  /**
  * for select project
 * // TODO: selectedProject
 * @param event
 */
  selectedProject(eve) {
    this.project_id = eve;
    this.drawing_id = null;
    this.page = 0;
    this.getListImages();
    const data = {
      'project_id': eve
    }
    this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
      console.log(res);
      this.drawinglist = res.data;
    })
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
  * for select drawing after project select
 * // TODO: selectedDrawing
 * @param event
 */
  selectedDrawing(eve) {
    this.drawing_id = eve;
    this.page = 0;
    this.getListImages();
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
    this.getListImages();
  }
  editable(file , id){
    console.log(file , id , 'kkkk')
  }
  /**
 * for popup detail
* // TODO: viewDetail
* @param id
* @returns detail with perticular id
*/
  viewDetail(id: any) {
    this.layoutsService.getImageDetail(id).subscribe((res: any) => {
      this.viewContent = res.data[0];
      // marker ploting
      this.viewContent.detected_images.forEach(element => {
          element.box_overlays.forEach(el => {
            el.w = el.w - el.x;
            el.h = el.h - el.y;
          });
      });


      var pngiconx = AppConst.pngiconx;
      var pngicony = AppConst.pngicony;
      var imagePos = [{ x: +this.viewContent.marker_position_x - pngiconx, y: +this.viewContent.marker_position_y - pngicony }];
      var canvas: HTMLCanvasElement = this.canvas.nativeElement;
      var context = canvas.getContext('2d');

      let img1 = new Image();
      let img2 = new Image();

      img1.onload = function () {
        canvas.width = img1.width;
        canvas.height = img1.height;
        context.drawImage(img1, 0, 0);
        img2.src = AppConst.pinImg;
      };

      img2.onload = function () {
        // for (var i = 0; i <= imagePos.length - 1; i += 1) {
        //   context.drawImage(img2, imagePos[i].x, imagePos[i].y);
        // }
        imagePos.forEach(element => {
          context.drawImage(img2, element.x, element.y);
        });
      };

      img1.src = this.viewContent.cad_image;
    })
  }

  /**
  * for delete images
 * // TODO: openDialog
 * @param id
 * @returns message
 */
  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.imagedeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layoutsService.deleteImages(id).subscribe((res: any) => {
          this.getListImages();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    });
  }

}
