import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogOverviewExampleDialog} from '../material-component/dialog/dialog.component';
import {DataLayerService} from '../data-layer.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  pendingRequest = true;
  errors = [];
  // spellingPass = 'No changes made';

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public parentData: any,
              public data: DataLayerService) { }

  ngOnInit() {
    this.data.getErrors().subscribe((progs: any) => {
      this.errors = progs;
      this.pendingRequest = false;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
