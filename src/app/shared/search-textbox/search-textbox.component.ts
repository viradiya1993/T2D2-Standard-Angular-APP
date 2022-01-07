import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-textbox',
  templateUrl: './search-textbox.component.html'
})
export class SearchTextboxComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<any>();
  @Output() resetIndex = new EventEmitter<any>();
  @ViewChild('searchForm') formValue: any;
  searchValue: any = '';

  constructor() { }

  ngOnInit() {
    this.formValue.resetForm();
  }

  search(value: any) {
    if (value === null) {
      value = '';
    }
    value = encodeURI(value);
    this.searchEvent.emit(value);
  }

  cancel(value: any) {
    value = null;
    this.formValue.resetForm();
    this.searchEvent.emit(value);
    this.resetIndex.emit(0);
  }
}
