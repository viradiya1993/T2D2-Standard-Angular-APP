import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload-progressbar-box',
  templateUrl: './file-upload-progressbar-box.component.html',
  styleUrls: ['./file-upload-progressbar-box.component.css']
})
export class FileUploadProgressbarBoxComponent implements OnInit {

  progress = [];
  view = true;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileUploadService.subject.subscribe({
      next: (data) => {
        let boo = false;
        for (const obj of this.progress) {
          if (obj.id === data.id) {
            obj.progress = data.progress
            obj.type = data.type;
            if (data.imgUrl) {
              obj['imgUrl'] = data.imgUrl;
              obj['tag'] = data.tag;
            }
            boo = true;
            // console.log(obj);
          }
        }
        if (!boo) {
          this.progress.push(data);
        }
        // console.log('-------------------', data);
      }
    });
  }

  deleteProgress() {
    this.progress = [];
    this.fileUploadService.reset();
  }

  toggleShowOption() {
    this.view = !this.view;
  }
  
  // Onlaod() {
  //   this.fileUploadService.subject.subscribe({
  //     next: (data) => {
  //       let boo = false;
  //       for (const obj of this.progress) {
  //         if (obj.id === data.id) {
  //           obj.progress = data.progress
  //           obj.type = data.type;
  //           if (data.imgUrl) {
  //             obj['imgUrl'] = data.imgUrl;
  //             obj['tag'] = data.tag;
  //           }
  //           boo = true;
  //           // console.log(obj);
  //         }
  //       }
  //       if (!boo) {
  //         this.progress.push(data);
  //       }
  //       // console.log('-------------------', data);
  //     }
  //   });
  // }

  
  DeleteImageItem(index: any) {
    this.progress.splice(index, 1);
  }
  
}
