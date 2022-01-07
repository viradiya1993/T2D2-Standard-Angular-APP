import { Component, OnInit } from '@angular/core';
import { Report } from '../../../models/report.model';
import { LayoutsService } from './../../layouts.service';
import { SharedService } from '../../../shared/shared.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AppConst } from './../../../app.constant';
import { MatDialog } from '@angular/material';
import { DeleteBoxComponent } from '../../../shared/delete-box/delete-box.component';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html'
})
export class AddReportComponent implements OnInit {
  projects = [];
  drawings = [];
  project_id: any;
  drawing_id: any;
  report_id: any;
  report: Report = new Report;
  images = [];
  selectedImg = [];
  editable = false;
  sortName: String = 'created_at';
  sortType: String = 'desc';
  page: any = 0;
  limit: number = AppConst.pageSize;
  index: number;
  length: any;
  imagepath: string;
  sliderImage = [];
  currentIndex = 0;
  previousValue : any;
  constructor(private layoutsService: LayoutsService,
    public sharedService: SharedService, private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { 
      this.project_id = JSON.parse(localStorage.getItem('_projectid'));
    }

  /**
  * for select image for report generation
  * // TODO: selectedimages
  * @returns list of selected images array 
  */

  ngOnInit() {
    this.getProjectsList();
    // this.getListReports();
    this.activatedRoute.params.subscribe((res: any) => {
      this.report_id = res.id;
      if (this.report_id) {
        this.layoutsService.getReportDetail(res.id).subscribe((response: any) => {
          this.editable = true;
          this.report.report_name = response.data.report_name;
        })
      }
    })
  }

  selectedimages(index, img, id, image_name) {
    const imageExists: Array<any> = this.selectedImg.find(el => el.id == id);
    if (!imageExists) {
      this.selectedImg.push(this.images[index]);
      const x = {
        id: id,
        img: img,
        image_name: image_name,
        isFlag: true
      }
      this.images.splice(index, 1, x);
    } else {
      this.selectedImg.splice(this.selectedImg.indexOf(imageExists), 1);
      const x = {
        id: id,
        img: img,
        image_name: image_name,
        isFlag: false
      }
      this.images.splice(index, 1, x);
    }
    console.log('images array', this.selectedImg);
  }
  viewImages(img) {
    this.sliderImage = img;
  }
  /**
  * for remove selected image
  * // TODO: removeFile
  * @returns list of images array 
  */
  removeFile(i, img, id, image_name) {
    this.selectedImg.splice(i, 1)
    const x = {
      id: id,
      img: img,
      image_name: image_name,
      isFlag: false
    }
    const imageExists1 = this.images.find(el => el.id == id);
    if (imageExists1) {
      var imagindex = this.images.indexOf(imageExists1)
      this.images.splice(imagindex, 1, x);
    }
  }

  /**
  * get list of projects
 * // TODO: getProjectsList
 * @returns list of projects
 */
  getProjectsList() {
    this.layoutsService.getProjectList().subscribe((res: any) => {
      this.projects = res.data;
      console.log('project list : ',this.projects);
      this.assignDefaultProject(this.project_id);
      this.selectedProject(this.project_id, false)
      // this.getListReports();
    })
  }

  /**
  * for reset filter
  * // TODO: resetFilter
  * @returns list of reports 
  */
  resetFilter() {
    this.assignDefaultProject(this.project_id)
    // this.drawing_id = '';
    this.page = 0;
    this.index = 0;
    this.drawings = [];
    this.selectedProject(this.project_id, false)
    // this.getListReports();
  }

  /**
  * for select project
 * // TODO: selectedProject
 * @param event
 */
  selectedProject(eve, flagValue) {
    
    this.project_id = eve;
    if (flagValue) {
      this.openDialog(eve);
    } else {
      this.drawing_id = null;
      this.page = 0;
      this.getListReports();
      const data = {
        'project_id': eve
      }
      this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
        this.drawings = res.data;
      })
    }

  }

  /**
 * for select drawing after project select
* // TODO: selectedDrawing
* @param event
*/
  selectedDrawing(eve) {
    this.drawing_id = eve;
    this.page = 0;
    this.getListReports();
  }

  /**
 * get list of inspectors
* // TODO: getListImages
* @returns list of inspectors
*/
  getListReports() {
    this.images = [];
    this.layoutsService.getreportImages(this.project_id, this.drawing_id, this.limit, this.page, this.sortName, this.sortType).subscribe((res: any) => {
      const imagedata = res.data.images[0].image_data;
      this.length = res.data.totalImages[0].count;
      this.imagepath = res.data.detectedImagePath
      // imagedata.forEach(element => {
      //   const img = element.image
      //   const id = element._id
      //   const image_name = element.image_name
      //   const album = {
      //     img: img,
      //     id: id,
      //     image_name:image_name,
      //     isFlag: false,
      //   }
      //   // filter selected image start
      //   const imageExists = this.selectedImg.find(el => el.id == id);
      //   if (imageExists) {
      //     album.isFlag = true;
      //   }
      //   // over
      //   this.images.push(album);
      // });
      imagedata.forEach(element => {
        // element.detectedImages.forEach(element1 => {

        const img = element.detectedImages
        const id = element._id
        const image_name = element.image_name
        const album = {
          img: img,
          id: id,
          image_name: image_name,
          isFlag: false,
        }
        // filter selected image start
        const imageExists = this.selectedImg.find(el => el.id == id);
        if (imageExists) {
          album.isFlag = true;
        }
        // over
        // for mobie and web sync
        album.img.forEach(element => {
          if (element.box_overlays !== null) {
            element.box_overlays.forEach(el => {
              el.w = el.w - el.x;
              el.h = el.h - el.y;
            });
          }
        })
        // over
        this.images.push(album);
        // })
      });
      
    })
  }



  /**
    * for pagination
    * // TODO: receiveMessage
    * @param event
    */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getListReports();
  }

  // submit report detail
  /**
  * // TODO: onSave
  * @param formDetail
  * @returns message
  */
  onSave() {
    var addreport = [];
    this.selectedImg.forEach(element => {
      addreport.push(element.id)
    });
    const data = {
      project_id : this.project_id,
      report_name: this.report.report_name,
      images: addreport
    }
    this.layoutsService.addReport(data).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/reports'])
    })
  }

  // update report detail
  /**
  * // TODO: onUpdate
  * @param formDetail
  * @returns message
  */
  onUpdate() {
    const data = {
      report_name: this.report.report_name
    }
    this.layoutsService.updateReport(data, this.report_id).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/reports'])
    })
  }

  assignDefaultProject(defaultProjectId){
    this.project_id = defaultProjectId;
    this.sharedService.setLocalStorage('previous_project_id',defaultProjectId);
  }

  /**
   * for disgard changes
  * // TODO: openDialog
  * @param id
  * @returns message
  */
  openDialog(project_id): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: 'Are you sure you want to discard the changes in project.'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.sharedService.setLocalStorage('previous_project_id',project_id)
        this.selectedImg = [];
        this.project_id = project_id;
        this.selectedProject(this.project_id, false)
      }else{
        this.project_id = this.sharedService.getLocalStorage('previous_project_id');

        console.log('in deletebox :no : ',this.project_id);
        this.sharedService.removeLocalStorage('previous_project_id');
      }   
    });
  }

}
