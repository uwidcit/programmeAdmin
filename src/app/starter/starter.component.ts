import { Component, AfterViewInit} from '@angular/core';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [UploadService]
})
export class StarterComponent implements AfterViewInit {
    faculties: any[] = [];
    progTotal: number;

    afuConfig = {
      multiple: false,
      formatsAllowed: '.xlsx',
      maxSize: '10',
      uploadAPI:  {
        url: 'https://example-file-upload-api',
        headers: {
          'Content-Type' : 'text/plain;charset=UTF-8',
        }
      },
      theme: 'dragNDrop',
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false
    };

    constructor(public progData: UploadService) {}

    ngOnInit() {
      this.progData.getProgrammeNumbers().subscribe((data: any) => {
        console.log(data);
        this.faculties = data;
        data.forEach((each_obj) => {
          this.progTotal += each_obj.number;
        });
      });
    }

  DocUpload($event) {
    this.afuConfig.hideResetBtn = false;
  }
    ngAfterViewInit() {}
}
