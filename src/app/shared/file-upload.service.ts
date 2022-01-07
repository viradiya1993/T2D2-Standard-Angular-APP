import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutsService } from 'app/layouts/layouts.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  files = [];
  fileWithProgressbar = [];
  apiUrl = this.layoutsService.url + 'image/add-not-registered-images'
  subject = new Subject<any>();
  uploadingFileCount = 0
  currentIndex = 0;
  uploadedFileCount = 0;
  private sbj = new Subject();

  constructor(private http: HttpClient, private layoutsService: LayoutsService) {
  }

  upload() {
    const self=this;
    let ind = self.currentIndex;
    if (self.files != null && self.files != undefined) {
      while (ind < self.files.length) {
        const reader = new FileReader();
        reader.readAsDataURL(self.files[ind].file);
        const project_id = JSON.parse(localStorage.getItem("_projectid"));
        const pro_id = self.files[ind].file.project_id = project_id;
        const fileName = self.files[ind].file.name;
        const fileId = self.files[ind].id;
        const filetag = self.files[ind].tag;
        reader.onload = (_event) => {
          const imgUrl = reader.result;
          // console.log('-----------------------------------------', imgUrl);
          self.subject.next({ name: fileName, type: -1, progress: 0, imgUrl: imgUrl, tag: filetag, id: fileId });
        };
        ind++;
      }
      self.uploadFile(self.currentIndex);
      self.sbj.subscribe(() => {
        console.log('inside subscribe');
        if (self.currentIndex < self.files.length) {
          // console.log('************************', self.files[self.currentIndex].name);
          self.uploadFile(self.currentIndex);
        }
      });
    }
  }
  uploadFile(index: number) {
    const self=this;
    const uploadData = new FormData()
    uploadData.append('name', self.files[index].file.name);
    uploadData.append('image', self.files[index].file);
    uploadData.append('project_id', self.files[index].file.project_id);
    self.http.post(self.apiUrl, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (self.files != null && self.files != undefined && self.files.length>0) {
          if (event.type === 0) {
            self.subject.next({ name: self.files[index].file.name, type: event.type, progress: 0, id: self.files[index].id });
            self.uploadingFileCount++;
            self.currentIndex++;
            // console.log(self.files[index].name);
            // console.log('-----------------', self.uploadingFileCount);
            if (self.uploadingFileCount < 3 && self.currentIndex < self.files.length) {
              self.sbj.next();
            }
          } else if (event.type === 1) {
            // @ts-ignore
            // tslint:disable-next-line:max-line-length
              self.subject.next({ name: self.files[index].file.name, type: event.type, progress: Math.round(100 * event.loaded / event.total), id: self.files[index].id });
            
          } else if (event.type === 4) {
            self.subject.next({ name: self.files[index].file.name, type: event.type, progress: 100, id: self.files[index].id });
            self.uploadingFileCount--;
            self.uploadedFileCount++;

            if (self.uploadingFileCount < 3 && self.currentIndex < self.files.length) {
              self.sbj.next();
            }

          }
        }
      });
  }

  reset() {
    const self=this;
    self.files = [];
    self.currentIndex = 0;
    self.uploadedFileCount = 0;
    self.uploadingFileCount = 0;
  }

}

