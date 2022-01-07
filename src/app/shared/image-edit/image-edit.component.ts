import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit, OnChanges {

  constructor() { }
  @ViewChild('canvas') canvas: ElementRef;
  @Input() image = ''
  @Input() staticarray
  @Input() curosal
  @Input() damagedetection
  dimensions: any;
  
  ngOnInit() {
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

  async ngOnChanges() {
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var context = canvas.getContext('2d');
    let img1 = new Image();
    this.dimensions = await this.getImageDimensions(this.image)
    var average = (this.dimensions.w + this.dimensions.h) / 2
    img1.onload = () => {
      canvas.width = img1.width;
      canvas.height = img1.height;
      context.drawImage(img1, 0, 0);
      if(this.staticarray !== null){
      this.staticarray.forEach(element => {
        context.beginPath();
        context.lineWidth = (average * 1.2) / 100;
        context.strokeStyle = element.setting_color;
        context.rect(element.x, element.y, element.w, element.h);
        context.stroke();
      });
      }
    };
    img1.src = this.image;
  }
}
