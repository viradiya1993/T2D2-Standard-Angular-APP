import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service'
import { LayoutsService } from './../../layouts.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-uplode-image-drawing',
  templateUrl: './uplode-image-drawing.component.html',
  styleUrls: ['./uplode-image-drawing.component.scss']
})
export class UplodeImageDrawingComponent implements OnInit {

  constructor(private sharedService: SharedService, private router: Router, private layoutsService: LayoutsService) { }

  ngOnInit() {
  }
  saveData(e) {
    this.layoutsService.uplodeImageSave(e).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/drawings'])
    })
  }
}