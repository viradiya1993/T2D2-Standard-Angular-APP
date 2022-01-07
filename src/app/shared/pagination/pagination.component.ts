import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { AppConst } from '../../app.constant';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {


  // MatPaginator Inputs
  length: any;
  pageSize = AppConst.pageSize;
  pageSizeOptions: number[] = AppConst.pageSizeOptions;
  pageEvent: PageEvent;
  offSet: any = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: number;
  @Input() index: number;
  @Output() messageEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.paginator.pageIndex = this.index;
  }
  getNext(event: PageEvent) {
    if (this.childMessage > 10) {
      this.messageEvent.emit(event);
    }
  }
}
