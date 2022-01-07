import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { LayoutsService } from './../../layouts/layouts.service';
import { ActivatedRoute } from '@angular/router'
import { AppConst } from './../../app.constant';
import { NgForm } from '@angular/forms';
import { Uplodeimage } from './../../models/uplode-image-project.model';
import { SharedService } from '../../shared/shared.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';
declare var $: any;
declare const Konva: any;
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  uplode: Uplodeimage = new Uplodeimage();
  hashTag: any;
  popupid: any;
  constructor(public sharedService: SharedService, private layoutsService: LayoutsService, private activatedRoute: ActivatedRoute,public behaviorService: SharedService) {
    this.Projectname = JSON.parse(localStorage.getItem("projectname"));
    this._projectId = JSON.parse(localStorage.getItem("_projectid"));
  }
  myFiles: any[] = [];
  urls = [];
  detectedData = [];
  detectedImages = [];
  project_id: any;
  drawing_id: any;
  projectslist: any[];
  drawinglist: any[];
  cadimagecontent: any;
  ximg: any;
  yimg: any;
  isShowCanvas = true;
  percentDone = [];
  progressIndex: any;
  count = 0;
  displaydetect = false;
  firstFormGroup = true;
  secondFormGroup = true;
  thirdFormGroup = true;

  dimensions: any
  selectedSquare: any;
  i = 0;
  addRect: any;
  finalArray = [];
  staticArray = [];
  position = []
  settings: any = [];
  color: any;
  openStatus = false;
  stageWidth: any;
  stageHeight : any;
  // removeClickEvent = false;

  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvas1') canvas1: ElementRef;
  @Output() saveData = new EventEmitter();

  _projectId: any;
  Projectname:any;
  ngOnInit() {
    this.project_id = ''
    $(".custom-file-input").on("change", function () {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
    this.getSetting()
    this.getProjectDrawing();
  }
  /**
   * for get project Drawing
   */
  getProjectDrawing() {
    const data = {'project_id': this._projectId }
    this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
      this.drawinglist = res.data;
    })
    
  }
  /**
  * for get image height and width
  * // TODO: getImageDimensions
  * @param file
  */
  getImageDimensions(file) {
    return new Promise(function (resolved, rejected) {
      var i = new Image()
      i.onload = function () {
        resolved({ w: i.width, h: i.height })
      };
      i.src = file
    })
  }

  /**
  * for Image marker Edit
  * // TODO: saveEditImage
  * @param imageobj
  */
  async saveEditImage(imageobj, idOfImage) {
    this.dimensions = await this.getImageDimensions(imageobj)
    this.stageWidth = AppConst.stageWidth;
    this.stageHeight = AppConst.stageHeight;
    if(this.dimensions.w > this.stageWidth && this.dimensions.h > this.stageHeight){
      var stage = new Konva.Stage({
        container: 'container',
        width: this.stageWidth,
        height: this.stageHeight
      });
     
      var layer = new Konva.Layer();
      stage.add(layer);
      // var bgRect = new Konva.Rect({width: stage.getWidth(), height: stage.getHeight(), fill: 'gold', opacity: 0.1});
      // layer.add(bgRect);
      var uploadedImage = new Konva.Image({
          x: stage.getWidth(),
          y: stage.getHeight(),
          width: this.dimensions.w, 
          height: this.dimensions.h,
         // stroke: 'red',
          //strokeWidth: 10,
          //draggable: false
      });
      layer.add(uploadedImage);
      var  imgObj = new Image();
      imgObj.onload = function() {
        uploadedImage.image(imgObj); 
        var padding = 20;
        var w = imgObj.width;  
        var h = imgObj.height;
        console.log(w);
        console.log(h);
        var targetW = stage.getWidth() - (2 * padding);
        var targetH = stage.getHeight() - (2 * padding);
        var widthFit =  targetW / w;
        var heightFit = targetH / h;
        var scale = (widthFit > heightFit) ? heightFit : widthFit;
        w = parseInt((w * scale).toString(), 10);
        h = parseInt((h * scale).toString(), 10);
        console.log(w);
        console.log(h);
        uploadedImage.size({
          width: AppConst.stageWidth,
          height: AppConst.stageHeight
        });
        uploadedImage.x( ( stage.getWidth() - uploadedImage.getWidth() ) / 2);
        uploadedImage.y( ( stage.getHeight() - uploadedImage.getHeight() ) / 2);
        layer.draw(); // My favourite thing to forget.
      }
      //23.401785714285715 552.3852459016393 110 120
      imgObj.src = imageobj;
    } else {
    var stage = new Konva.Stage({
      container: 'container',
      width: this.dimensions.w,
      height: this.dimensions.h
    });

    var background = new Konva.Layer();
    var layer = new Konva.Layer();
    var context = background.getContext();
    var imageObj1 = new Image();
    imageObj1.src = imageobj;
    imageObj1.onload = function () {
      context.drawImage(imageObj1, 0, 0);
    };
    stage.add(background);
    stage.draw();
    layer.draw();
    stage.add(layer);
  }
    var tr = new Konva.Transformer();
    layer.add(tr);

    layer.draw();

    stage.on('click tap', (e) => {
      
      this.selectedSquare = e.target.attrs.name;
      if (e.target === stage) {
        stage.find('Transformer').destroy();
        layer.draw();
        return;
      }
      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName(e.target.name())) {
        return;
      }
      stage.find('Transformer').destroy();
      var tr = new Konva.Transformer(
        {
          keepRatio: false,
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        }
      );
      tr.rotateEnabled(false)
      layer.add(tr);
      tr.attachTo(e.target);
      var MAX_WIDTH = 10;
      e.target.on('transform', function() {
        var width = e.target.width() * e.target.scaleX();
        var height = e.target.height() * e.target.scaleY();
        if (width < MAX_WIDTH) {
          var scaleX = MAX_WIDTH / e.target.width();
          e.target.scaleX(scaleX);
        }
        if (height < MAX_WIDTH) {
          var scaleY = MAX_WIDTH / e.target.height();
          e.target.scaleY(scaleY);
        }
      })  
      layer.draw();
    });

    // this.filterdArray = this.detectedData.filter(e => e.id == id)
    // this.filterdArray.forEach(element => {
    //   element.data.position.forEach(element1 => {
    //     this.i = this.i + 1
    //     layer.add(
    //       this.addrect(element1.x, element1.y, element1.w, element1.h, this.i)
    //     );
    //     tr.forceUpdate();
    //     layer.draw();
    //   })

    // });


    if(this.dimensions.w > this.stageWidth && this.dimensions.h > this.stageHeight){
      var filterdArray = this.detectedData.find(e => e.id == idOfImage)
      filterdArray.position.forEach(element => {
        this.i = this.i + 1
        var x = Math.abs((element.x * this.stageWidth)/this.dimensions.w);
        var y = Math.abs((element.y * this.stageHeight)/this.dimensions.h);
        var w = Math.abs((element.w * this.stageWidth) / this.dimensions.w );
        var h = Math.abs((element.h * this.stageHeight) / this.dimensions.h);
          console.log(element.x , element.y , w , h , 'x , y , w , h')
        layer.add(
          this.addrect(x , y , w , h , this.i, element.setting_color)
        );
  
        tr.forceUpdate();
        layer.draw();
      });
    } else {
    var filterdArray = this.detectedData.find(e => e.id == idOfImage)
    filterdArray.position.forEach(element => {
      this.i = this.i + 1

      layer.add(
        this.addrect(element.x, element.y, element.w, element.h, this.i, element.setting_color)
      );

      tr.forceUpdate();
      layer.draw();
    });
  } 

    document.getElementById('test').addEventListener('click', () => {
      this.i = this.i + 1
      layer.add(
        this.addrect(90, 100, 110, 120, this.i, this.color)
      );
     // tr.forceUpdate();
      this.addRect.on('transform', function () {
      })
      layer.draw();
    });
    document.getElementById('save_' + idOfImage).addEventListener('click', () => {
      $("#viewModel1").modal('hide');
      $(this).removeData();
      var json = stage.toJSON();
      this.saveddata(json, idOfImage)
    })

    document.getElementById('remove').addEventListener('click', () => {
      stage.find('.' + this.selectedSquare).remove()
      stage.find('Transformer').destroy();
      layer.draw()
    })
    // }
  }

  /**
  * for Image marker plot
  * // TODO: addrect
  * @param Dimensions 
  */
  addrect(x, y, w, h, i, type) {
    var poswidth = this.dimensions.w;
    var posheight = this.dimensions.h;
    this.addRect = new Konva.Rect({
      x: x,
      y: y,
      width: w,
      height: h,
      stroke: type,
      name: 'rect' + i,
      draggable: true,
      strokeScaleEnabled: false,
      // dragBoundFunc: function (pos) {
      //   x = pos.x <= 1 ? 1 : pos.x >= poswidth - w ? poswidth - w : pos.x;
      //   y = pos.y <= 1 ? 1 : pos.y >= posheight - h ? posheight - h : pos.y;
      //   return { x: x, y: y }
      // }
    })
    return this.addRect
  }

  /**
  * for saved image edited array 
  * // TODO: saveddata
  * @param ImagePosition 
  */
  saveddata(json, id) {
    if (this.popupid == id) {
      if(this.dimensions.w > this.stageWidth && this.dimensions.h > this.stageHeight){
        this.finalArray = [];
        var data = JSON.parse(json);
        var data1 = data.children[0].children.filter(el => el.className == 'Rect')
        console.log(data1)
        data1.forEach(element => {
          var x = Math.abs((element.attrs.x * this.dimensions.w) / this.stageWidth);
          var y = Math.abs((element.attrs.y *  this.dimensions.h) / this.stageHeight);
          var w = Math.abs((element.attrs.width * this.dimensions.w) / this.stageWidth );
          var h = Math.abs((element.attrs.height * this.dimensions.h) / this.stageHeight);
          console.log(w , h)
          var settingColor = element.attrs.stroke
          if (element.attrs.scaleX && element.attrs.scaleY) {
            if (element.attrs.scaleX < 0) {
              this.finalArray.push({ x: x - Math.abs(w * element.attrs.scaleX), y: y, w: Math.abs(w * element.attrs.scaleX), h: Math.abs(h * element.attrs.scaleY), setting_color: settingColor })
            } else if (element.attrs.scaleY < 0) {
              this.finalArray.push({ x: x, y: y - Math.abs(h * element.attrs.scaleY), w: Math.abs(w * element.attrs.scaleX), h: Math.abs(h * element.attrs.scaleY), setting_color: settingColor })
            } else if (element.attrs.scaleX < 0 && element.attrs.scaleY < 0) {
              this.finalArray.push({ x: x - Math.abs(w * element.attrs.scaleX), y: y - Math.abs(h * element.attrs.scaleY), w: Math.abs(w * element.attrs.scaleX), h: Math.abs(h * element.attrs.scaleY), setting_color: settingColor })
            } else {
              this.finalArray.push({ x: x, y: y, w: (w * element.attrs.scaleX), h: (h * element.attrs.scaleY), setting_color: settingColor })
            }
          } else {
            this.finalArray.push({ x: x, y: y, w: w, h: h, setting_color: settingColor })
          }
        });
      } else {
      this.finalArray = [];
      var data = JSON.parse(json);
      var data1 = data.children[1].children.filter(el => el.className == 'Rect')
      data1.forEach(element => {
        var x = Math.abs(element.attrs.x);
        var y = Math.abs(element.attrs.y);
        var w = Math.abs(element.attrs.width);
        var h = Math.abs(element.attrs.height);
        var settingColor = element.attrs.stroke
        if (element.attrs.scaleX && element.attrs.scaleY) {
          if (element.attrs.scaleX < 0) {
            this.finalArray.push({ x: x - Math.abs(w * element.attrs.scaleX), y: y, w: Math.abs(w * element.attrs.scaleX), h: Math.abs(h * element.attrs.scaleY), setting_color: settingColor })
          } else if (element.attrs.scaleY < 0) {
            this.finalArray.push({ x: x, y: y - Math.abs(h * element.attrs.scaleY), w: Math.abs(w * element.attrs.scaleX), h: Math.abs(h * element.attrs.scaleY), setting_color: settingColor })
          } else if (element.attrs.scaleX < 0 && element.attrs.scaleY < 0) {
            this.finalArray.push({ x: x - Math.abs(w * element.attrs.scaleX), y: y - Math.abs(h * element.attrs.scaleY), w: Math.abs(w * element.attrs.scaleX), h: Math.abs(h * element.attrs.scaleY), setting_color: settingColor })
          } else {
            this.finalArray.push({ x: x, y: y, w: (w * element.attrs.scaleX), h: (h * element.attrs.scaleY), setting_color: settingColor })
          }
        } else {
          this.finalArray.push({ x: x, y: y, w: w, h: h, setting_color: settingColor })
        }
      });
    }
      var ids = this.detectedData.find(e => e.id == id)
      ids.position = this.finalArray;
      this.detectedData.forEach(ele => {
        if (ele.id == id) {
          ele.position = ids.position
        }
      })
      this.staticArray = this.finalArray;
      id = "";
    }
  }

 /**
  * for selected image get and conver to base 64 
  * // TODO: getFileDetails
  * @param imageArry 
  */
  getFileDetails(e) {
    if (this.urls.length == 5) {
      return this.sharedService.loggerError('Maximum 5 images are allowed');
    }
    let count = 0;
    for (var i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        count++;
        if (this.urls.length < 5) {
          this.urls.push(event.target.result);
        }
        if (count == 6) {
          this.sharedService.loggerError('Maximum 5 images are allowed');
        }
      }
      reader.readAsDataURL(e.target.files[i]);
    }
  }

  /**
  * for remove image after brouwse image 
  * // TODO: removeFile
  * @param indexOfImage 
  */
  removeFile(index) {
    console.log(index);
    //  this.myFiles.splice(index, 1)
    this.urls.splice(index, 1)
  }

  /**
  * for Detected Image Dispay 
  * // TODO: uplodeDetectedImages
  */
  uplodeDetectedImages() {
    this.detectedData = []
    this.urls.forEach((element) => {
      let uuid = UUID.UUID();
      // this.sharedService.showLoader();
      this.detectedData.push({ data: element, id: uuid, position: this.position })
      // this.sharedService.hideLoader();
    });

  }

  /**
  * for Edit image - Marker Plot
  * // TODO: editable
  * @param FileOfImageAndIdOfImage 
  */
  editable(file, id) {
    this.popupid = id
    this.saveEditImage(file, id)
    file = '';
    id = '';
  }

  /**
* // TODO: getSetting
* @returns setting list
*/
  getSetting() {
    this.layoutsService.getGlobalSetting().subscribe((res: any) => {
      this.settings = res.data;
    })
  }

   /**
  * For convert Base64 to Input type File
  * // TODO: dataURItoBlob
  * @param ImageFile 
  */
  dataURItoBlob(data) {
    var dataURI = data.data
    if (dataURI) {
      const byteString1 = dataURI.toString();
      const byteString = atob(byteString1.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
    }
  }

  /**
  * For Remove Detected Image
  * // TODO: removeFiledetected
  * @param ImageIndex 
  */
  removeFiledetected(i) {
    this.detectedData.splice(i, 1);
  }

   /**
  * For Selected Project Id from Dropdown List
  * // TODO: selectedProject
  * @param SelectedProjectId 
  */
  selectedProject(eve) {
    this.project_id = eve;
    this.drawing_id = null;
    const data = {
      'project_id': eve
    }
    this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
      this.drawinglist = res.data;
    })
  }

   /**
  * For captionChange Of Image
  * // TODO: captionChange
  */
  captionChange() {
    var regexp = /\B\#\w\w+\b/g
    var result = this.uplode.caption.match(regexp);
    if (result) {
      var stringGenerat = result.toString()
      this.hashTag = stringGenerat;
    } else {
      this.hashTag = ""
    }
  }

  /**
  * for select drawing after project select
  * // TODO: selectedDrawing
  * @param event
  */
  selectedDrawing(eve) {
    this.drawing_id = eve;
    this.layoutsService.getDrawingDetail(this.drawing_id).subscribe((res: any) => {
      this.cadimagecontent = res.data.drawing.cad_image;
      var canvas: HTMLCanvasElement = this.canvas.nativeElement;
      var context = canvas.getContext('2d');
      var canvas1: HTMLCanvasElement = this.canvas1.nativeElement;
      var context1 = canvas1.getContext('2d');
      let img1 = new Image();
      img1.onload = function () {
        canvas.width = img1.width;
        canvas.height = img1.height;
        context.drawImage(img1, 0, 0);

        canvas1.width = img1.width;
        canvas1.height = img1.height;
        context1.drawImage(img1, 0, 0);
      }
      img1.src = this.cadimagecontent;
    })
  }

  /**
  * For get X and Y Coordinate after click image 
  * // TODO: getxy
  * @param event
  */
  getxy(e: MouseEvent): void {
    var $div = $(e.target);
    var offset1 = $div.offset();
    this.ximg = (e.pageX - offset1.left);
    this.yimg = (e.pageY - offset1.top);
    var pngiconx = AppConst.pngiconx;
    var pngicony = AppConst.pngicony;
    var imagePos = [{ x: this.ximg - pngiconx, y: this.yimg - pngicony }];
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var canvas1: HTMLCanvasElement = this.canvas1.nativeElement;
    var context = canvas.getContext('2d');
    var context1 = canvas1.getContext('2d');

    let img1 = new Image();
    let img2 = new Image();

    img1.onload = function () {
      canvas.width = img1.width;
      canvas.height = img1.height;
      context.drawImage(img1, 0, 0);
      canvas1.width = img1.width;
      canvas1.height = img1.height;
      context1.drawImage(img1, 0, 0);
      img2.src = AppConst.pinImg;
    };

    img2.onload = function () {
      imagePos.forEach(element => {
        context.drawImage(img2, element.x, element.y);
        context1.drawImage(img2, element.x, element.y);
      });
    };
    img1.src = this.cadimagecontent;
  }

  /**
   * get list of projects
  * // TODO: getProjectsList
  * @returns list of projects
  */
  // getProjectsList() {
  //   this.layoutsService.getProjectList().subscribe((res: any) => {
  //     this.projectslist = res.data;
  //   })
  // }

  /**
  * For Get Project List
  * // TODO: secoundStapperSave
  * @returns list of projects
  */
  // secoundStapperSave() {
  //   this.getProjectsList();
  // }

  /**
  * For Save Detected Image With Name and Caption 
  * // TODO: onSave
  */
  onSave() {
    this.sharedService.showLoader();
    this.FourthStapperSave();
  }

  /**
  * For Uplode Image Server one By one And Save api For Detected Image
  * // TODO: FourthStapperSave
  */
  FourthStapperSave() {
    var detectedData = this.detectedData
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // file extension according to Data
    const imageName = date + '.' + text + '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(detectedData[this.count]);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', imageFile);
    this.layoutsService.uplodeImage(formData).subscribe(
      (res: any) => {

        detectedData[this.count].position.forEach(el => {
          el.w = el.w + el.x;
          el.h = el.h + el.y;
        });
        // detectedData[this.count].position = detectedData[this.count].position.w
        this.detectedImages.push({ detected_image: res.data.image, box_overlays: detectedData[this.count].position })
        this.count++;
      }, err => {

      }, () => {
        if (this.count < this.detectedData.length) {
          this.FourthStapperSave();
        } else {
          this.sharedService.hideLoader();
          // const data = {
          //   project_id: this.project_id,
          //   drawing_id: this.drawing_id,
          //   image_name: this.uplode.image_name,
          //   caption: this.uplode.caption,
          //   marker_position_x: this.ximg,
          //   marker_position_y: this.yimg,
          //   images: this.detectedImages,
          //   hash_tag: this.hashTag
          // }
          const data = {
            project_id: this._projectId,
            drawing_id: this.drawing_id,
            image_name: this.uplode.image_name,
            caption: this.uplode.caption,
            marker_position_x: this.ximg,
            marker_position_y: this.yimg,
            images: this.detectedImages,
            hash_tag: this.hashTag
          }
          this.saveData.emit(data);
        }
      })
  }
/*******  Below code not need  ********/

  // FourthStapperSave() {
  //   const data = {
  //     project_id: this.project_id,
  //     drawing_id: this.drawing_id,
  //     image_name: this.uplode.image_name,
  //     caption: this.uplode.caption,
  //     marker_position_x: this.ximg,
  //     marker_position_y: this.yimg,
  //     images: this.detectedData
  //   }
  //   this.saveData.emit(data)
  // }



  //  // in grouping create callback function
  //  uploadFiles(){
  //   console.log(this.count ,this.urls.length)
  //   if(this.count < this.urls.length){
  //  // this.detectedData = []
  //   // this.urls.forEach((element, index) => {
  //   var urls = this.urls
  //     const date = new Date().valueOf();
  //     let text = '';
  //     const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     for (let i = 0; i < 5; i++) {
  //       text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
  //     }
  //     // Replace extension according to your media type
  //     const imageName = date + '.' + text + '.jpeg';
  //     // call method that creates a blob from dataUri
  //    // if (urls[count]) {
  //       const imageBlob = this.dataURItoBlob(urls[this.count]);
  //       const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
  //       const formData = new FormData();
  //       formData.append('image', imageFile);
  //       this.apicalling(formData ,this.uploadFiles.bind(this))
  //    // }
  //   // });
  //   // this.detectedData = this.urls;
  //   }
  // }

  // apicalling(formData , callback){
  // var index  = this.count 
  // this.layoutsService.uplodeImageProject(formData)
  // .subscribe(event => {
  //   // Via this API, you get access to the raw event stream.
  //   // Look for upload progress events.
  //   if (event.type === HttpEventType.UploadProgress) {
  //     // This is an upload progress event. Compute and show the % done:
  //     $('#progress_' + index).show();
  //     this.percentDone[index] = Math.round(100 * event.loaded / event.total);
  //   } else if (event instanceof HttpResponse) {
  //       this.count++

  //     var response: any = event
  //     this.detectedData.push(response.body.data.image)

  //     console.log('File is completely uploaded!');
  //     callback()

  //   }
  // });

  // }

  // end grouping


  // uploadFiles() {
  //   this.detectedData = []
  //   this.urls.forEach(element => {

  //     const date = new Date().valueOf();
  //     let text = '';
  //     const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     for (let i = 0; i < 5; i++) {
  //        text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
  //     }
  //     // Replace extension according to your media type
  //     const imageName = date + '.' + text + '.jpeg';
  //     // call method that creates a blob from dataUri
  //     if(element){
  //     const imageBlob = this.dataURItoBlob(element);
  //       if(imageBlob){
  //     const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

  //         if(imageFile){
  //     const formData = new FormData();
  //     formData.append('image', imageFile);

  //     // let promise:any = new Promise((resolve, reject) => {
  //     //   let apiURL = 'http://192.168.1.150:4000/api/v2/' + 'image-upload';
  //     //   this.http.post(apiURL,formData)
  //     //     .toPromise()
  //     //     .then(
  //     //       res => { // Success
  //     //         console.log(res);
  //     //         resolve();
  //     //       }
  //     //     );
  //     // });
  //     // console.log(promise.data,'dddddddddd')
  //     // this.detectedData.push(promise.data.image)
  //     this.layoutsService.uplodeImageProject1(imageFile).subscribe((res: any) => {
  //       var xyz = JSON.parse(res);
  //       console.log(res)
  //     //  if(res){
  //       this.detectedData.push(xyz.data.image)
  //     //}
  //     })
  //   }
  //   }
  //   }
  //   });
  //   // this.detectedData = this.urls;
  // }



  //   uploadFiles(){
  //     this.detectedData = []
  //      this.urls.forEach((element , index) => {

  //       const date = new Date().valueOf();
  //       let text = '';
  //       const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //       for (let i = 0; i < 5; i++) {
  //         text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
  //       }
  //       // Replace extension according to your media type
  //       const imageName = date + '.' + text + '.jpeg';
  //       // call method that creates a blob from dataUri
  //       if (element) {
  //         const imageBlob = this.dataURItoBlob(element);
  //         const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });


  //         const formData = new FormData();
  //         formData.append('image', imageFile);
  //         this.layoutsService.uplodeImageProject2(formData).subscribe((res:any) => {
  //           console.log(res.message , 'mmmmmmmmmmmmmmmm')
  //         })
  //   }
  // })
  //   }



}
