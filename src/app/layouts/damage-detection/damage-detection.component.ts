import { Component, OnInit, NgZone } from '@angular/core';
import { LayoutsService } from './../layouts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service'

@Component({
  selector: 'app-damage-detection',
  templateUrl: './damage-detection.component.html',
  styleUrls: ['./damage-detection.component.scss']
})
export class DamageDetectionComponent implements OnInit {
  projectid = JSON.parse(localStorage.getItem("_projectid"));
  constructor(private sharedService: SharedService, private router: Router, private layoutsService: LayoutsService,private zone: NgZone) { 
    if(!this.projectid === null || this.projectid === undefined || !this.projectid){
      this.zone.run(() => { this.router.navigate(['/projectlist']) })
    }
  }

  ngOnInit() {
  }
  saveDatas(e) {
    console.log(e, 'event')
    this.layoutsService.uplodeImageSave(e).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/dashboard'])
    })
  }
}
