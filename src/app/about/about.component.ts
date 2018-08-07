import { Component, OnInit } from '@angular/core';

/**
 * This component is responsible for displaying basic information about the website
 * as well as providing a list of subjects for the user to view. This list of subjects
 * are all the subjects that exist in our database and the user should ensure that
 * all programme requirement subjects come from this list. Any unknown programmes will
 * be flagged as an error on the home page.
 * */

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

/**
 * @class
 * */
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }



}
