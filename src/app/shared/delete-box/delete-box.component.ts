import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-box',
  templateUrl: './delete-box.component.html'
})
export class DeleteBoxComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }
  onCancle(): void {
    this.dialogRef.close();
  }
}
