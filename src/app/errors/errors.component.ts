import { Component, OnInit } from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {HttpClient} from '@angular/common/http';

/**
 * This class is responsible for displaying a list of erroneous programmes inside a dialog box.
 * */

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
  providers: [HttpClient]
})

/**
 * @class
 * */
export class ErrorsComponent implements OnInit {
  /**
   * This will activate a spinner when true. This indicates that data has not arrived from
   * the backend as yet. It is only set to false when there is data to be displayed, and thus
   * will deactivate the spinner
   * */
  pendingRequest: boolean;

  /**
   * This will hold all the erroneous data to be displayed on the screen
   * */
  errors: any[];

  /**
   * Initializes pendingRequest to true. This activates the progress spinner in the html until
   * the get request is completed
   * @param data - This is the service that makes the get request
   * */
  constructor(private data: DataLayerService) {
    this.pendingRequest = true;
  }

  /**
   * Immediately retrieves all errors from the database to be displayed on the screen
   * */
  ngOnInit() {
    this.data.getErrors().then((progs: any) => {
      this.errors = progs;
      this.pendingRequest = false;
    }).catch((error: any) => { console.log(error); });
  }

}
