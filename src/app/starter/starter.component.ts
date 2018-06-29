import { Component, AfterViewInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [DataLayerService]
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

    constructor(public data: DataLayerService) {}

    ngOnInit() {
      const facs = Object.keys(environment.faculties);

      facs.forEach((each_fac) => {
        const new_info = {
          'title': '',
          'number': 0
        };
        new_info.title = each_fac;
        this.data.getProgsByFaculty(environment.faculties[each_fac])._subscribe((data) => {
          new_info.number = data.body.length;
        });

        this.faculties.push(new_info);

        // new_info.number =
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
