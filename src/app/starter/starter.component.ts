import { Component, AfterViewInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {environment} from '../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {ErrorsComponent} from '../errors/errors.component';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [DataLayerService]
})
export class StarterComponent implements AfterViewInit {
    faculties: any[] = [];
    progTotal: number;
    pendingRequest = true;

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

  openDialog(): void {
    let dialogRef = this.dialog.open(ErrorsComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

    constructor(public data: DataLayerService,
                public dialog: MatDialog,
                public snackBar: MatSnackBar) {}

    ngOnInit() {
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

    DocUpload($event) {
      const fileInfo = document.querySelector('.textOverflow');
      console.log(fileInfo);
      this.snackBar.open('Upload Completed!');
    }

    ngAfterViewInit() {
      const p_elem = <HTMLElement>document.querySelector('.constraints-info');
      p_elem.style.display = 'none';
      this.formatText.innerText = 'only .xlsx format is allowed for upload';
      document.querySelector('#div1').appendChild(this.formatText);
    }
}
