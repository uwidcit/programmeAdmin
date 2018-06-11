import { Component, AfterViewInit, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {UploadService} from '../upload.service';
import {FileUploadModule} from 'angular-file-uploader';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [UploadService]
})
export class StarterComponent implements AfterViewInit {
    programmes: any = [];
    progTotal: number = 0;
    ngAfterViewInit() {}

    constructor(public progData: UploadService) {}

    ngOnInit() {
      this.progData.getProgrammeNumbers().subscribe((data: any) => {
        console.log(data);
        this.programmes = data;
        data.forEach((each_obj) => {
          this.progTotal += each_obj.number;
        });
      });
    }
}
