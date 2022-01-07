import { Component, OnInit, NgZone,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LayoutsService } from 'app/layouts/layouts.service';
import { SharedService } from 'app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
  project_id: any;
  files: File[] = [];
  //files:any = []
  test:any = []
  urls = [];
  @ViewChild('fileInput') fileInput;
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
    }

  ngOnInit() {
  }
  onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
   
	// onSelect(event) {
  //   console.log(...event.addedFiles);
  //   this.files.push(...event.addedFiles);
  //   //this.test.push(...event.addedFiles);
  //   this.behaviorService.images(this.test);
  //   //this.zone.run(() => { this.router.navigate(['/gallery/progress-gallery']) })
	// }
  // onSelectFile(event) {
  //   console.log(event.target.files)
  //   if (event.target.files && event.target.files[0]) {
  //       var filesAmount = event.target.files.length;
  //        for (let i = 0; i < filesAmount; i++) {
  //               var reader = new FileReader();
  //               reader.onload = (event:any) => {
  //                 console.log(event.target.result);
  //                  this.urls.push(event.target.result); 
  //               }
  //               reader.readAsDataURL(event.target.files[i]);
  //               console.log(event.target.files[i]);
  //       }
  //   }
  // }
	// onRemove(event) {
	// 	console.log(event);
	// 	this.files.splice(this.files.indexOf(event), 1);
	// }
}
