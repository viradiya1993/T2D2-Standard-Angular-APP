import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AppConst } from './../../app.constant';
import { MatDialog } from '@angular/material';
import { DeleteBoxComponent } from './../../shared/delete-box/delete-box.component';
import { LayoutsService } from './../layouts.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawings',
  templateUrl: './drawings.component.html',
  styleUrls: ['./drawings.component.scss']
})
export class DrawingsComponent implements OnInit {

  searchKey: any = null;
  page: any = 0;
  length: any;
  limit: number = AppConst.pageSize;
  dataSource: any;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  viewContent: any;
  index: number;
  displayedColumns: string[] = ['no', 'drawing_name', 'action'];
  project_id: any;
  permissions : any =[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('canvas') canvas: ElementRef;


  constructor(public dialog: MatDialog,
    private layoutsService: LayoutsService, public sharedService: SharedService,public behaviorService: SharedService,private zone: NgZone,private router: Router) {
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
    this.getListDrawings();
  }

  /**
  * for serching table
  * // TODO: receiveSearchValue
  * @returns list of drawings related to search
  */
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getListDrawings();
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
    this.getListDrawings();
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
  * // TODO: getListDrawings
  * @returns list of inspectors
  */
  getListDrawings() {
    this.layoutsService.getDrawings(this.limit, this.page, this.sortName, this.sortType, this.searchKey,this.project_id).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data.drawings[0].drawing_data);
      this.length = res.data.totalDrawings[0].count;
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
    this.getListDrawings();
  }

  /**
   * for popup detail
  * // TODO: viewDetail
  * @param id
  * @returns detail with perticular id
  */
  viewDetail(id) {
    if (id) {
      this.layoutsService.getDrawingDetail(id).subscribe((res: any) => {
        this.viewContent = res.data;
        var pngiconx = AppConst.pngiconx;
        var pngicony = AppConst.pngicony;
        var seticon = [];
        this.viewContent.imageData.forEach(el => {
          el.marker_position_x = +el.marker_position_x - pngiconx;
          el.marker_position_y = +el.marker_position_y - pngicony;
          seticon.push({ x: el.marker_position_x, y: el.marker_position_y });
        });

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
          // for (var i = 0; i <= seticon.length; i += 1) {
          //   context.drawImage(img2, seticon[i].x, seticon[i].y);
          // }
          seticon.forEach(element => {
            context.drawImage(img2, element.x, element.y);
          });
        };

        img1.src = this.viewContent.drawing.cad_image;
        
      })
    }
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
      data: AppConst.drawingdeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layoutsService.deleteDrawing(id).subscribe((res: any) => {
          this.getListDrawings();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    });
  }

}
