import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageDataModel } from '../../../models/image.model';
import { LayoutsService } from '../../layouts.service'
import { SharedService } from '../../../shared/shared.service'
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConst } from './../../../app.constant';
declare var $: any;
declare const Konva: any;

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html'
})
export class AddImageComponent implements OnInit {
  imageId: any;
  image: ImageDataModel = new ImageDataModel();
  hashTag: any;
  project_id: any;
  drawinglist: any[];
  drawing_id: string;
  cadimagecontent: any;
  viewContent: any;
  popupid: any;
  dimensions: any;
  selectedSquare: any;
  detectedData = [];
  detectedImages = [];
  i = 0;
  color: any;
  addRect: any;
  finalArray = [];
  staticArray = [];
  settings: any = [];
  currentIndex = 0;
  savedImageArray = [];
  stageWidth: any;
  stageHeight: any;
  ximg: any;
  yimg: any;
  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvas1') canvas1: ElementRef;

  constructor(private layoutsService: LayoutsService, public sharedService: SharedService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.project_id = JSON.parse(localStorage.getItem("_projectid"));
  }

  ngOnInit() {
    this.getDrawingListForProject();
    this.getIdImages();
  }

  /**
  * for get Image id from Url
  * // TODO: getIdImages
  * @returns IdOfImage
  */
  getIdImages() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.imageId = res.id;
      if (this.imageId) {
        this.viewDetail(this.imageId)
      }
    });
    this.getSetting();
  }


  // submit images detail
  /**
  * // TODO: onSave
  * @param formDetail
  * @returns message
  */
  onSave() {
    var regexp = /\B\#\w\w+\b/g
    var result = this.viewContent.caption.match(regexp);
    if (result) {
      var stringGenerat = result.toString()
      this.hashTag = stringGenerat;
    } else {
      this.hashTag = ""
    }
    const data = {
      image_name: this.viewContent.image_name,
      image_caption: this.viewContent.caption,
      hash_tag: this.hashTag,
      drawing_id: this.drawing_id,
      marker_position_x: this.ximg,
      marker_position_y: this.yimg
    }
    console.log('Update data', data);
    this.layoutsService.updateImage(this.imageId, data).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.myForm.reset();
      this.router.navigate(['/images'])
    })
  }

  getDrawingListForProject() {
    let data = {
      "project_id": this.project_id
    }
    this.layoutsService.getDrawingforImage(data).subscribe((res: any) => {
      console.log(res);
      this.drawinglist = res.data;
    })
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
      console.log(this.viewContent);
      this.detectedData = [];
      this.viewContent.detected_images.forEach((element) => {
        this.detectedData.push({ data: element.detected_image, id: element._id, position: element.box_overlays ? element.box_overlays : [] })
      });
      // marker ploting
      this.viewContent.detected_images.forEach(element => {
        if (element.box_overlays !== null) {
          element.box_overlays.forEach(el => {
            el.w = el.w - el.x;
            el.h = el.h - el.y;
          });
        }
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
        imagePos.forEach(element => {
          context.drawImage(img2, element.x, element.y);
        });
      };
      img1.src = this.viewContent.cad_image;
    })
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
    this.dimensions = await this.getImageDimensions(imageobj);
    this.stageWidth = AppConst.stageWidth;
    this.stageHeight = AppConst.stageHeight;
    if (this.dimensions.w > this.stageWidth && this.dimensions.h > this.stageHeight) {
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
      var imgObj = new Image();
      imgObj.onload = function () {
        uploadedImage.image(imgObj);
        var padding = 20;
        var w = imgObj.width;
        var h = imgObj.height;
        var targetW = stage.getWidth() - (2 * padding);
        var targetH = stage.getHeight() - (2 * padding);
        var widthFit = targetW / w;
        var heightFit = targetH / h;
        var scale = (widthFit > heightFit) ? heightFit : widthFit;
        w = parseInt((w * scale).toString(), 10);
        h = parseInt((h * scale).toString(), 10);
        uploadedImage.size({
          width: AppConst.stageWidth,
          height: AppConst.stageHeight
        });
        uploadedImage.x((stage.getWidth() - uploadedImage.getWidth()) / 2);
        uploadedImage.y((stage.getHeight() - uploadedImage.getHeight()) / 2);
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
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        }
      );
      tr.rotateEnabled(false)
      layer.add(tr);
      tr.attachTo(e.target);
      var MAX_WIDTH = 10;
      e.target.on('transform', function () {
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


    if (this.dimensions.w > this.stageWidth && this.dimensions.h > this.stageHeight) {
      var filterdArray = this.detectedData.find(e => e.id == idOfImage)
      filterdArray.position.forEach(element => {
        this.i = this.i + 1
        var x = Math.abs((element.x * this.stageWidth) / this.dimensions.w);
        var y = Math.abs((element.y * this.stageHeight) / this.dimensions.h);
        var w = Math.abs((element.w * this.stageWidth) / this.dimensions.w);
        var h = Math.abs((element.h * this.stageHeight) / this.dimensions.h);
        layer.add(
          this.addrect(x, y, w, h, this.i, element.setting_color)
        );
        tr.forceUpdate();
        layer.draw();
      });
    } else {
      var filterdArray = this.detectedData.find(e => e.id == idOfImage)
      console.log(this.detectedData);
      filterdArray.position.forEach(element => {
        this.i = this.i + 1

        layer.add(
          this.addrect(element.x, element.y, element.w, element.h, this.i, element.setting_color)
        );

        tr.forceUpdate();
        layer.draw();
      });
    }

    document.getElementById('add_rect').addEventListener('click', () => {
      this.i = this.i + 1
      layer.add(
        this.addrect(90, 100, 110, 120, this.i, this.color)
      );
      // added for removing editable box
      stage.find('Transformer').destroy();
      // tr.forceUpdate();
      layer.draw();
    });
    $('#save_detectedimage').off('click').on('click', () => {
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
      if (this.dimensions.w > this.stageWidth && this.dimensions.h > this.stageHeight) {
        this.finalArray = [];
        var data = JSON.parse(json);
        var data1 = data.children[0].children.filter(el => el.className == 'Rect')
        data1.forEach(element => {
          var x = Math.abs((element.attrs.x * this.dimensions.w) / this.stageWidth);
          var y = Math.abs((element.attrs.y * this.dimensions.h) / this.stageHeight);
          var w = Math.abs((element.attrs.width * this.dimensions.w) / this.stageWidth);
          var h = Math.abs((element.attrs.height * this.dimensions.h) / this.stageHeight);
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
        data1.map(element => {
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
      this.detectedData.forEach(ele => {
        if (ele.id == id) {
          ele.position = this.finalArray;
        }
      })

      this.savedImageArray = []
      this.detectedData.forEach(ele => {
        ele.position.forEach(element => {
          element.w = element.w + element.x;
          element.h = element.h + element.y;
        });
        var data = { detected_image: ele.data, box_overlays: ele.position ? ele.position : [], _id: ele.id }
        this.savedImageArray.push(data);
      })
      const imagedetail = {
        detected_images: this.savedImageArray
      }
      this.saveEditDetectedImages(imagedetail)
    }
  }

  /**
  * for saved image and Its Detail in Server 
  * // TODO: saveEditDetectedImages
  */
  saveEditDetectedImages(imageDetailArray) {
    this.layoutsService.editDetectedImages(this.imageId, imageDetailArray).subscribe((res: any) => {
      this.savedImageArray = []
      this.getIdImages();
    })
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

  selectedDrawing(eve) {
    this.drawing_id = eve;
    this.layoutsService.getDrawingDetail(this.drawing_id).subscribe((res: any) => {
      console.log(res);
      this.cadimagecontent = res.data.drawing.cad_image;
      var canvas: HTMLCanvasElement = this.canvas.nativeElement;
      var context = canvas.getContext('2d');
      // var canvas1: HTMLCanvasElement = this.canvas1.nativeElement;
      // var context1 = canvas1.getContext('2d');
      let img1 = new Image();
      img1.onload = function () {
        canvas.width = img1.width;
        canvas.height = img1.height;
        context.drawImage(img1, 0, 0);

        // canvas1.width = img1.width;
        // canvas1.height = img1.height;
        // context1.drawImage(img1, 0, 0);
      }
      img1.src = this.cadimagecontent;
    })
  }

  getxy(e: MouseEvent): void {
    console.log(e);
    var $div = $(e.target);
    var offset1 = $div.offset();
    this.ximg = (e.pageX - offset1.left);
    this.yimg = (e.pageY - offset1.top);
    var pngiconx = AppConst.pngiconx;
    var pngicony = AppConst.pngicony;
    var imagePos = [{ x: this.ximg - pngiconx, y: this.yimg - pngicony }];
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    // var canvas1: HTMLCanvasElement = this.canvas1.nativeElement;
    var context = canvas.getContext('2d');
    // var context1 = canvas1.getContext('2d');

    let img1 = new Image();
    let img2 = new Image();

    img1.onload = function () {
      canvas.width = img1.width;
      canvas.height = img1.height;
      context.drawImage(img1, 0, 0);
      // canvas1.width = img1.width;
      // canvas1.height = img1.height;
      // context1.drawImage(img1, 0, 0);
      img2.src = AppConst.pinImg;
    };

    img2.onload = function () {
      imagePos.forEach(element => {
        context.drawImage(img2, element.x, element.y);
        // context1.drawImage(img2, element.x, element.y);
      });
    };
    if (this.viewContent.cad_image) {
      img1.src = this.viewContent.cad_image;
    } else {
      img1.src = this.cadimagecontent;
    }
    console.log(this.ximg);
    console.log(this.yimg);
  }

}
