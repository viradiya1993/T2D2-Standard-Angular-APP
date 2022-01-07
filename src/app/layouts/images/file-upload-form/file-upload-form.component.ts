import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { FileUploadService } from 'app/shared/file-upload.service';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.css']
})
export class FileUploadFormComponent implements OnInit {
  form: FormGroup;
  dropZoneActive = false;
  tag = JSON.parse(localStorage.getItem("projectname"));;

  constructor(private fb: FormBuilder, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      files: ['']
    });
  }

  onSelect(event, fileInput?: HTMLInputElement): void {
    let id = this.fileUploadService.files.length;
    const filesWithTag = [];
    for (const file of event.target.files) {
      filesWithTag.push({file: file, tag: this.tag, id: id});
      id++;
    }
    this.fileUploadService.files.push(...filesWithTag);
    this.fileUploadService.upload();
    fileInput.value = null;
  }

  onDrop(fileList: FileList) {
    let id = this.fileUploadService.files.length;
    const filesWithTag = [];
    // @ts-ignore
    for (const file of fileList) {
      filesWithTag.push({file: file, tag: this.tag, id: id});
      id++;
    }
    this.fileUploadService.files.push(...filesWithTag);
    this.fileUploadService.upload();
  }

  dropZoneState($event: boolean) {
    //console.log($event);
    this.dropZoneActive = $event;
  }
}
