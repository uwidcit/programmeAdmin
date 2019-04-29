import { Component, AfterViewInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ErrorsComponent} from '../errors/errors.component';
import {OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import { environment } from '../../environments/environment';
import {UploadComponent} from '../upload/upload.component';

/**
 * This component shows the home page directly after a user has logged in
 * successfully. For any faculty-level adminstrator, only the list of each faculty
 * and the number of programmes offered will be shown as well as a button to
 * navigate to the View Component.
 * A top-level administrator will be able to view all this and an area for uploading
 * new data to the backend and all upload errors.
 * */
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [DataLayerService, AuthService]
})
export class StarterComponent implements OnInit, AfterViewInit {
  /**
   * Contains a list of faculty names and the number of programmes offered in each faculty
   * */
  faculties: any[] = [];
  /**
   * Shows the total number of programmes currently in the database
   * */
  progTotal: number;
  /**
   * Shows the number of upload errors from the previous upload. This number is displayed
   * on the "Show Errors" button as a Material Badge
   * */
  errTotal: number;
  /**
   * Determines whether or not to hide the badge showing number of errors. 0 errors
   * will cause the badge to be hidden
   * */
  hideBadge: boolean;
  /**
   * This will activate a spinner when undefined or true, showing that data has not
   * arrived from the backend as yet. False will hide the spinner and display the data
   * */
  pendingRequest: boolean;
  /**
   * This is the faculty colour of the currently logged in administrator.
   * */
  bg_color: string;
  /**
   * Determines whether or not the upload area and the errors button should be shown
   * */
  admin_view: boolean;

  uploads:any = [];

  active = null;

  environment = environment;

  activateLoading = false;

  /**
   * Creating a new paragraph tag to integrate into the angular file uploader html
   * */
  formatText = document.createElement('p');

  /**
   * Hides badge and activates spinner by default. Also waits for the auth state to see who is logged in
   * */
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
      }
    });
  }

  /**
   * Opens up an Angular Material Dialog box and launches the Errors Component
   * */
  openDialog(id): void {
    this.dialog.open(ErrorsComponent, {data:id});
  }

  loadUploads(){
    this.data.getUploads().subscribe(uploads=> {
      this.uploads = uploads;
      this.active = this.uploads.filter(upload=>upload.synced)[0].id;
    });
  }

  deleteUpload(id){
    this.data.deleteUpload(id).subscribe(res=>{
      console.log(res);
      this.snackBar.open(`Upload ${id} deleted!`, 'Close', { duration: 3000 });
      this.loadUploads();
    });
  }

  activateUpload(id){
    this.activateLoading = true;
    this.data.activateUpload(id).subscribe(res=>{
      console.log(res);
      this.activateLoading = false;
      this.snackBar.open(`Upload ${id} activated!`, 'Close', { duration: 3000 });
      this.loadUploads();
    });
  }


  /**
   * Opens up an Angular Material Dialog box and launches the Upload Component
   * */
  openUploadDialog(): void {
    let dialogRef = this.dialog.open(UploadComponent, { data: { programmes: -1, errors: -1}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.snackBar.open("File Uploaded", 'Close', { duration: 3000 });
      this.loadUploads();
    });
  }


  /**
   * Immediately gets all the errors and number of programmes offered by each faculty. A
   * snackbar will be displayed if the request was not successful.
   * */
  ngOnInit() {
    this.bg_color = 'primary';
    this.loadUploads();


    this.data.getFacStats().then((stats: any) => {
      const names = Object.keys(stats);
      console.log(stats);
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
    }).catch((error: any) => {
      console.log(error);
      this.snackBar.open(error.message, 'Close', { duration: 3000 });
      console.log(error);
    });
  }
  /**
   * After the DOM is initialized, HTML is dynamically inserted into the angular file uploader HTML code
   * to make it more readable and informative. It has to be done this way since all the HTML code from
   * angular-file-uploader is locked behind a single tag, so the developer will need to wait until after
   * the DOM has been created before changing the HTML inside.
   * */
  ngAfterViewInit() {
    const p_elem = <HTMLElement>document.querySelector('.constraints-info');
    if (p_elem) { p_elem.style.display = 'none'; }
    this.formatText.innerText = 'Supported formats: .xlsx';
    const div1 = <HTMLElement>document.querySelector('#div1');
    if (div1) { div1.appendChild(this.formatText); }
  }
}
