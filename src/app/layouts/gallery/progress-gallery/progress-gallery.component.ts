import {Component, OnInit, Input, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LayoutsService } from 'app/layouts/layouts.service';
import { SharedService } from 'app/shared/shared.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-progress-gallery',
  templateUrl: './progress-gallery.component.html',
  styleUrls: ['./progress-gallery.component.scss']
})
export class ProgressGalleryComponent implements OnInit {
  project_id: any;
  Files:any;
  urls = [];
  @Input() progress = 0;
  constructor(public dialog: MatDialog,
    private layoutsService: LayoutsService, public sharedService: SharedService,public behaviorService: SharedService,private zone: NgZone,private router: Router,public _d: DomSanitizer) {
      this.behaviorService.ChangeSide$.subscribe(result => {
        if(result) {
          this.project_id = result._id;
        } else if(result == null) {
          this.project_id = JSON.parse(localStorage.getItem("_projectid"));
        }
      });
      // this.behaviorService.images$.subscribe(result => {    
      //   if(result) {
      //     console.log(result.length,'lenght');
      //     var filesAmount = result.length;
      //     //console.log(filesAmount);
      //     // for (let i = 0; i < filesAmount; i++) {
      //     //   var reader = new FileReader();
      //     //   reader.onload = (result:any) => {
      //     //      this.urls.push(result); 
      //     //   }
      //     //     // reader.readAsDataURL();
      //     // }
      //    // var reader = new FileReader();

      //     // reader.readAsDataURL(result); 
      //     // reader.onload = (event) => { 
      //     //   this.Files= event.target.result;
      //     //   console.log(event);
      //     //   console.log('this files');
      //     //   //console.log(this.Files);
      //     // }

      //     //console.log(this.Files,'result ok');
      //     //localStorage.setItem("images", JSON.stringify(result));
      //   } else if (result == null) {
      //     //this.Files = JSON.parse(localStorage.getItem("images"));
      //     //console.log(this.Files,'result null');
      //   }
      // });
      if(!this.project_id === null || this.project_id === undefined || !this.project_id){
        this.zone.run(() => { this.router.navigate(['/projectlist']) })
      }
    }

  ngOnInit() {

    console.log('this sunil');
    console.log(this.Files);
  }

}
