import { Component, OnInit } from '@angular/core';
import {DataLayerService} from '../data-layer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  subjects: any[];
  filtered: any[];
  clickedSub: string;
  radios: string[];

  constructor(private data: DataLayerService) {
    this.subjects = [];
    this.filtered = [];
    this.radios = ['Any', 'CSEC', 'CAPE'];
  }

  ngOnInit() {
    this.data.getSubjects().then((subs: any[]) => {
      subs = subs.sort((sub1, sub2) => { // sort objects alphabetically
        if (sub1.name > sub2.name) { return 1;  }
        if (sub1.name < sub2.name) { return -1; }
        return 0;
      });
      this.subjects = subs;
      this.filtered = subs;
    }).catch((error: any) => { console.log(error); });
  }

  filter(value) {
    if (value === null) { return this.subjects; }
    const subset = [];
    this.subjects.forEach(prog => {
      if (prog.name.toLowerCase().includes(value.toLowerCase())) {
        subset.push(prog);
      }
    });
    return subset;
  }

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
