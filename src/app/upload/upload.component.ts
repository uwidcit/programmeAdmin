import { Component, OnInit, Inject } from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {environment} from '../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(public dataService: DataLayerService,  public dialogRef: MatDialogRef<UploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  /**
   * A config Object to set up the upload functionality. This is according
   * to the documentation given by {@link https://github.com/kzrfaisal/angular-file-uploader Angular-File-Uploader}.
   * */
    // AFU config uploads form data with the key 'file'
  afuConfig = {
    multiple: false, // only one file upload at a time
    formatsAllowed: '.xlsx', // only allow excel format
    maxSize: '10', // 10MB
    uploadAPI:  {
      url: environment.upload // POST request endpoint
    },
    theme: 'dragNDrop',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false
  };

  /**
   * This event is fired right after the upload button is pressed.
   * */
  DocUpload(event) {
    console.log('upload responded with ', event.response);
    this.data = JSON.parse(event.response);
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
