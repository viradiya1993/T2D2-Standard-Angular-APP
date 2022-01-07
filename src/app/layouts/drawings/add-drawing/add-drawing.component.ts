import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './../../../shared/shared.service'
import { Drawing } from './../../../models/drawing.model';
import { LayoutsService } from './../../layouts.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from '../../../shared/image-cropper/interfaces/image-cropped-event.interface';
import { ImageCropperComponent } from '../../../shared/image-cropper/component/image-cropper.component';
import { AppConst } from '../../../app.constant';
declare var jQuery: any;

@Component({
  selector: 'app-add-drawing',
  templateUrl: './add-drawing.component.html'
})
export class AddDrawingComponent implements OnInit {

  drawing: Drawing = new Drawing();
  public imagePath;
  editable = false;
  drawingId = null;
  croppedImage: any = '';
  showCropper = false;
  isImageUpload: boolean = false;
  fileExt: String = 'JPG,JPEG,PNG';
  imageChangedEvent: any = '';
  projects: any[];
  heightValidation = false;
  _projectId:any;
  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;


  constructor(public sharedService: SharedService, private layoutsService: LayoutsService,
    private router: Router, private activatedRoute: ActivatedRoute) {
      this._projectId = JSON.parse(localStorage.getItem("_projectid")); 
     };


  ngOnInit() {
    this.getProjectsList();
    this.activatedRoute.params.subscribe((res: any) => {
      this.drawingId = res.id;
      if (this.drawingId) {
        this.layoutsService.getDrawingDetail(res.id).subscribe((response: any) => {
          this.editable = true;
          this.drawing = response.data.drawing;
          this.drawing.project_id = response.data.drawing.project_id._id;
          if (response.data.cad_image === null) {
            this.drawing.cad_image = AppConst.selectImg;
          }
        })
      }
    })
    if (this.drawing.cad_image === undefined) {
      this.drawing.cad_image = AppConst.selectImg;
    }
  }

  /**
  * for image crope 
  * // TODO: imageCropped
  * @returns file of croped image
  */
  imageCropped(event: ImageCroppedEvent) {
    if (event.height < 150) {
      this.heightValidation = true;
    } else {
      this.heightValidation = false;
    }
    this.croppedImage = event.base64;
  }

  /**
  * for cropped image save 
  * // TODO: saveImage
  * @returns save file of croped image
  */
  saveImage() {
    this.isImageUpload = true;
    this.drawing.cad_image = this.croppedImage;
    jQuery('#ideal_model').modal('hide');
  }

  /**
 * when image lode in cropper 
 * // TODO: imageLoaded
 * @returns croped image
 */
  imageLoaded() {
    this.showCropper = true;
  }

  /**
  * when user change cropped image so new image reflect 
  * // TODO: onChangeUserImage
  * @returns file of croped image
  */
  onChangeUserImage(event: any) {
    const extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim(); });
    const ext = event.target.files[0].name.toUpperCase().split('.').pop() || event.target.files[0].name;
    this.drawing.drawing_name = event.target.files[0].name;
    const exists = extensions.includes(ext);
    if (exists) {
      jQuery('#ideal_model').modal('show');
      this.imageChangedEvent = event;
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
    })
  }

  // submit inspector detail
  /**
  * // TODO: onSubmit
  * @param formDetail
  * @returns message
  */
  onSubmit(type) {

    const formData = new FormData;
    // formData.append('project_id', this.drawing.project_id);
    formData.append('project_id', this._projectId);
    formData.append('drawing_name', this.drawing.drawing_name);
    console.log('this.drawing.drawing_description : ',this.drawing.drawing_description);
    if(this.drawing.drawing_description && this.drawing.drawing_description != ''){
      formData.append('drawing_description', this.drawing.drawing_description);
    }else{
      formData.append('drawing_description', '');
    }
    formData.append('cad_image', this.isImageUpload ? this.drawing.cad_image : '');

    if (type === 'save') {
      if (this.isImageUpload == false) {
        this.sharedService.loggerError('Please Select a Image');
      } else {
        this.layoutsService.addDrawing(formData).subscribe((res: any) => {
          this.sharedService.loggerSuccess(res.message);
          this.myForm.reset();
          this.router.navigate(['/drawings'])
        })
      }
    } else {
      this.layoutsService.updateDrawing(formData, this.drawingId).subscribe((res: any) => {
        this.sharedService.loggerSuccess(res.message);
        this.myForm.reset();
        this.router.navigate(['/drawings'])
      })
    }
  }
}
