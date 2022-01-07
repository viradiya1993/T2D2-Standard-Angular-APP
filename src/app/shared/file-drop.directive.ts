import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {FileUploadService} from './file-upload.service';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter<boolean>();
  constructor() { }

  @HostListener('drop', ['$event']) onDrop($event) {
    $event.preventDefault();
    console.log($event.dataTransfer.files);
    this.filesDropped.emit($event.dataTransfer.files);
    this.filesHovered.emit(false);
  }

  @HostListener('dragover', ['$event']) onDragOver($event) {
    $event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave($event) {
    $event.preventDefault();
    this.filesHovered.emit(false);
  }

}
