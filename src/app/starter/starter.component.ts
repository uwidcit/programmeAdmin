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

    formatText = document.createElement('p');

    constructor(public progData: UploadService) {}

    ngOnInit() {
      if (this.faculties.length === 0) {
        this.progData.getFacultyNumbers().subscribe((data: any) => {
          console.log('Getting data from server...');
          console.log(data);
          this.faculties = data;
        });
      } else { console.log('Values already stored, fetching...'); }
      this.faculties.forEach((each_obj) => {
        this.progTotal += each_obj.number;
      });
    }

    DocUpload($event) {
      const fileInfo = document.querySelector('.textOverflow');
      console.log(fileInfo);
      // fileInfo.style.width = '100%';
      // fileInfo.nextSibling.style.width = '100%';
    }

    ngAfterViewInit() {
      const p_elem = <HTMLElement>document.querySelector('.constraints-info');
      p_elem.style.display = 'none';
      this.formatText.innerText = 'only .xlsx format is allowed for upload';
      document.querySelector('#div1').appendChild(this.formatText);
    }
}
