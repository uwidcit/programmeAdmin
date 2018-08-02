import { Component, AfterViewInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ErrorsComponent} from '../errors/errors.component';
import {OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [DataLayerService, AuthService]
})
export class StarterComponent implements OnInit, AfterViewInit {
  faculties: any[] = [];
  progTotal: number;
  errTotal: number;
  hideBadge: boolean;
  pendingRequest: boolean;
  bg_color: string;
  text_color: string;

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

  admin_view: boolean;
  formatText = document.createElement('p');

  constructor(private data: DataLayerService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private auth: AuthService) {
    this.hideBadge = true;
    this.pendingRequest = true;
    this.auth.data_incoming.subscribe(user => {
      if (user !== undefined ) {
        this.admin_view = user.write;
        this.bg_color = user.color;
        this.text_color = 'white';
      }
    });
  }

  openDialog(): void {
    this.dialog.open(ErrorsComponent, { width: '75%' });
  }

  ngOnInit() {
    this.bg_color = 'primary';
    this.data.getErrors().then((progs: any) => {
      this.errTotal = progs.length;
      this.hideBadge = (progs == null);
    }).catch((error: any) => { console.log(error); });

    this.data.getFacStats().then((stats: any) => {
      const names = Object.keys(stats);
      this.faculties = names.map(fac_name => {
        return {
          title: fac_name,
          number: stats[fac_name]
        };
      });
      this.progTotal = this.faculties
        .map(obj => obj.number)
        .reduce((a, b) => a + b);

      this.pendingRequest = false;
    }).catch((error: any) => { console.log(error); });

  }

  DocUpload(event) {
    const response = JSON.parse(event);
    if (response.errors !== 0) {
      this.errTotal = response.errors;
      this.hideBadge = false;
    }
    document.querySelector('.textOverflow');
    this.snackBar.open('Upload Completed!', 'Close', {duration: 750});
  }

  ngAfterViewInit() {
    const p_elem = <HTMLElement>document.querySelector('.constraints-info');
    if (p_elem) { p_elem.style.display = 'none'; }
    this.formatText.innerText = 'Supported formats: .xlsx';
    const div1 = <HTMLElement>document.querySelector('#div1');
    if (div1) { div1.appendChild(this.formatText); }
  }
}
