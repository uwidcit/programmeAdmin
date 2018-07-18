import { Component, AfterViewInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {environment} from '../../environments/environment';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ErrorsComponent} from '../errors/errors.component';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [DataLayerService]
})
export class StarterComponent implements OnInit, AfterViewInit {
    faculties: any[] = [];
    progTotal: number;
    errTotal: number;
    hideBadge = true;
    pendingRequest = true;

    afuConfig = {
      multiple: false,
      formatsAllowed: '.xlsx',
      maxSize: '10',
      uploadAPI:  {
        url: 'https://snickdx.me:3004/upload'
      },
      theme: 'dragNDrop',
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false
    };

    formatText = document.createElement('p');

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorsComponent, {
      width: '75%'
    });
  }

    constructor(public data: DataLayerService,
                public dialog: MatDialog,
                public snackBar: MatSnackBar) {}

    ngOnInit() {
      this.data.getErrors().subscribe((progs: any) => {
        this.errTotal = progs.length;
        this.hideBadge = (progs == null);
      });


      const facs = Object.keys(environment.faculties);

      facs.forEach((each_fac) => {
        const new_info = {
          'title': '',
          'number': 0
        };
        new_info.title = each_fac;
        this.data.getProgsByFaculty(environment.faculties[each_fac]).subscribe((data: any) => {
          new_info.number = data.length;
          this.pendingRequest = false;
        });

        this.faculties.push(new_info);
      });
    }

    DocUpload(event) {
      console.log(event);
      const response = JSON.parse(event);
      this.progTotal = response.programmes;
      if (response.errors !== 0) {
        this.errTotal = response.errors;
        this.hideBadge = false;
      }
      const fileInfo = document.querySelector('.textOverflow');
      console.log(fileInfo);
      this.snackBar.open('Upload Completed!', 'Close', {duration: 750});
    }

    ngAfterViewInit() {
      const p_elem = <HTMLElement>document.querySelector('.constraints-info');
      p_elem.style.display = 'none';
      this.formatText.innerText = 'Supported formats: .xlsx';
      const div1 = <HTMLElement>document.querySelector('#div1');
      div1.appendChild(this.formatText);
    }
}
