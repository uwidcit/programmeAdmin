import { Component, OnInit } from '@angular/core';
import {DataLayerService} from '../data-layer.service';

interface Subject {
  name: string;
  level: string;
}

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
  /**
   * The list of all subjects in the database
   * */
  subjects: Subject[];
  /**
   * The list of subjects when performing a search.
   * This is the array that is always displayed, the subjects property is never changed
   * after it has been populated with data
   * */
  filtered: Subject[];
  /**
   * Contains the different levels of subjects. More to be
   * added later as the application includes more subjects and different examining bodies
   * */
  radios: string[];

  /**
   * constructor - instantiates all Subject arrays to empty and the radios array to the subject levels
   * */
  constructor(private data: DataLayerService) {
    this.subjects = [];
    this.filtered = [];
    this.radios = ['Any', 'CSEC', 'CAPE'];
  }

  /**
   * ngOnInit - Immediately gets the list of subjects and sorts them in alphabetical order
   * @return undefined
   * */
  ngOnInit() {
    this.data.getSubjects().then((subs: Subject[]) => {
      subs = subs.sort((sub1, sub2) => { // sort objects alphabetically
        if (sub1.name > sub2.name) { return 1;  }
        if (sub1.name < sub2.name) { return -1; }
        return 0;
      });
      this.subjects = subs;
      this.filtered = subs;
    }).catch((error: any) => { console.log(error); });
  }

  /**
   * filter - returns an array containing only elements having a substring of the param
   * @param {string} value - The substring that every element should possess
   * @return {any[]} subset - The filtered list
   * */
  filter(value): Subject[] {
    if (value === null) { return this.subjects; }
    const subset = [];
    this.subjects.forEach(prog => {
      if (prog.name.toLowerCase().includes(value.toLowerCase())) {
        subset.push(prog);
      }
    });
    return subset;
  }

  /**
   * subjectFilter - Filters from either user input into the text bar or pressing a radio button
   * No matter which the user picks, this function first filters by the value in the text input
   * and then filters the result by the clicked radio button. The filtered result is set to the
   * class attribute this.filtered, and thus no return value is necessary
   * @param {string} level - Either 'CSEC' or 'CAPE'. This is taken from the clicked radio button
   * @return undefined
   * */
  subjectFilter(level?: string) {
    const search = document.querySelector('#searchbar') as HTMLInputElement;
    const searchText = search.value;
    const textFilter = this.filter(searchText);

    if (level === undefined || level === '') {
      this.filtered = textFilter;
    } else {
      switch (level) {
        case 'CSEC':
          this.filtered = textFilter.filter(sub => sub.level === 'CSEC');
          break;
        case 'CAPE':
          this.filtered = textFilter.filter(sub => sub.level === 'CAPE');
          break;
        default:
          this.filtered = textFilter;
      }
    }
  }

}
