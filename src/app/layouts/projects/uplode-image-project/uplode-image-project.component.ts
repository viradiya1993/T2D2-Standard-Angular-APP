import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutsService } from './../../layouts.service';
import { Router, ActivatedRoute } from '@angular/router'
import { AppConst } from './../../../app.constant';
import { NgForm } from '@angular/forms';
import { Uplodeimage } from './../../../models/uplode-image-project.model';
import { SharedService } from '../../../shared/shared.service'
declare var $: any;
declare const Konva: any;

@Component({
  selector: 'app-uplode-image-project',
  templateUrl: './uplode-image-project.component.html',
  styleUrls: ['./uplode-image-project.component.scss']
})
export class UplodeImageProjectComponent implements OnInit {
  ngOnInit() { }
  //   uplode: Uplodeimage = new Uplodeimage();
  constructor(private sharedService: SharedService, private router: Router, private layoutsService: LayoutsService, private activatedRoute: ActivatedRoute) { }
  //   myFiles: any[] = [];
  //   urls = [];
  //   detectedData = [];
  //   project_id: any;
  //   drawing_id: any;
  //   projectslist: any[];
  //   drawinglist: any[];
  //   cadimagecontent: any;
  //   ximg: any;
  //   yimg: any;
  //   isShowCanvas = true;
  //   // drawing: any
  //   // public imagePath;
  //   // testArray = [];
  //   // abc: any
  //   // i = 0;
  //   // selectedSquare: any;
  //   // fainalArray = [];
  //   // staticArray = []
  //   // w:any;
  //   // h:any;
  //   // remove12 = false
  //   @ViewChild(NgForm) myForm: NgForm;
  //   @ViewChild('canvas') canvas: ElementRef;
  //   @ViewChild('canvas1') canvas1: ElementRef;
  //   // @ViewChild('canvas3') canvas3: ElementRef;


  //   ngOnInit() {
  //     this.activatedRoute.params.subscribe((res: any) => {
  //       this.project_id = res.id

  //       const data = {
  //         'project_id': this.project_id
  //       }
  //       this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
  //         this.drawinglist = res.data;
  //       })
  //     })
  //   }

  //   // for selected image get and conver to base 64
  //   getFileDetails(e) {
  //     for (var i = 0; i < e.target.files.length; i++) {
  //       this.myFiles.push(e.target.files[i]);
  //       var reader = new FileReader();
  //       reader.onload = (event: any) => {
  //         this.urls.push(event.target.result);
  //       }
  //       reader.readAsDataURL(e.target.files[i]);
  //     }
  //   }

  //   // for remove image after brouwse image
  //   removeFile(index) {
  //     this.myFiles.splice(index, 1)
  //     this.urls.splice(index, 1)
  //   }

  //   // for update to tensor flow api calling
  //   uploadFiles() {
  //     this.detectedData = []
  //     this.myFiles.forEach(element => {
  //       const formData = new FormData();
  //       formData.append('image', element);
  //       this.layoutsService.uplodeImageProject(formData).subscribe((res: any) => {
  //         this.detectedData.push(res.data.image)
  //       })
  //     });
  //     // this.detectedData = this.urls;
  //   }


  //   removeFiledetected(i) {
  //     this.detectedData.splice(i, 1);
  //   }

  //   selectedProject(eve) {
  //     console.log(eve, 'ee')
  //     this.project_id = eve;
  //     this.drawing_id = null;
  //     const data = {
  //       'project_id': eve
  //     }
  //     this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
  //       this.drawinglist = res.data;
  //     })
  //   }

  //   changeStatus(event , index){

  //   }

  //   /**
  //  * for select drawing after project select
  // * // TODO: selectedDrawing
  // * @param event
  // */
  //   selectedDrawing(eve) {
  //     this.drawing_id = eve;
  //     this.layoutsService.getDrawingDetail(this.drawing_id).subscribe((res: any) => {
  //       this.cadimagecontent = res.data.drawing.cad_image;
  //       var canvas: HTMLCanvasElement = this.canvas.nativeElement;
  //       var context = canvas.getContext('2d');
  //       var canvas1: HTMLCanvasElement = this.canvas1.nativeElement;
  //       var context1 = canvas1.getContext('2d');
  //       let img1 = new Image();
  //       img1.onload = function () {
  //         canvas.width = img1.width;
  //         canvas.height = img1.height;
  //         context.drawImage(img1, 0, 0);

  //         canvas1.width = img1.width;
  //         canvas1.height = img1.height;
  //         context1.drawImage(img1, 0, 0);
  //       }
  //       img1.src = this.cadimagecontent;
  //     })
  //   }

  //   getxy(e: MouseEvent): void {
  //     var $div = $(e.target);
  //     var offset1 = $div.offset();
  //     this.ximg = (e.pageX - offset1.left);
  //     this.yimg = (e.pageY - offset1.top);
  //     var pngiconx = AppConst.pngiconx;
  //     var pngicony = AppConst.pngicony;
  //     var imagePos = [{ x: this.ximg - pngiconx, y: this.yimg - pngicony }];
  //     var canvas: HTMLCanvasElement = this.canvas.nativeElement;
  //     var canvas1: HTMLCanvasElement = this.canvas1.nativeElement;
  //     var context = canvas.getContext('2d');
  //     var context1 = canvas1.getContext('2d');

  //     let img1 = new Image();
  //     let img2 = new Image();

  //     img1.onload = function () {
  //       canvas.width = img1.width;
  //       canvas.height = img1.height;
  //       context.drawImage(img1, 0, 0);
  //       canvas1.width = img1.width;
  //       canvas1.height = img1.height;
  //       context1.drawImage(img1, 0, 0);
  //       img2.src = AppConst.pinImg;
  //     };

  //     img2.onload = function () {
  //       imagePos.forEach(element => {
  //         context.drawImage(img2, element.x, element.y);
  //         context1.drawImage(img2, element.x, element.y);
  //       });
  //     };
  //     img1.src = this.cadimagecontent;
  //   }

  //   /**
  //    * get list of projects
  //   * // TODO: getProjectsList
  //   * @returns list of projects
  //   */
  //   getProjectsList() {
  //     this.layoutsService.getProjectList().subscribe((res: any) => {
  //       this.projectslist = res.data;
  //     })
  //   }

  //   thirdStapperSave() {
  //     console.log(this.detectedData, 'detectedData')
  //   }

  //   secoundStapperSave() {
  //     this.getProjectsList();
  //   }

  //   FourthStapperSave(){
  //     const data = {
  //       project_id: this.project_id,
  //       drawing_id: this.drawing_id,
  //       image_name: this.uplode.image_name,
  //       caption: this.uplode.caption,
  //       marker_position_x: this.ximg,
  //       marker_position_y: this.yimg,
  //       images: this.detectedData
  //     }
  //     console.log(data,'dataaa')
  //   }
  saveData(e) {
    console.log(e, 'event')
    this.layoutsService.uplodeImageSave(e).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/projects'])
    })
  }
}
