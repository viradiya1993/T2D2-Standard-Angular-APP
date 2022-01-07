import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LayoutsService } from '../layouts.service';
import { SharedService } from 'app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  project_id: any;
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

}
