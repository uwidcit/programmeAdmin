import { Component, OnInit } from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-programme-page',
  templateUrl: './edit-programme-page.component.html',
  styleUrls: ['./edit-programme-page.component.css'],
  providers: [DataLayerService]
})
export class EditProgrammePageComponent implements OnInit {
  hideOneCSEC = true; oneCSEC = [];
  hideTwoCSEC = true; twoCSEC = [];
  hideOneCAPE = true; oneCAPE = [];
  hideTwoCAPE = true; twoCAPE = [];
  noCombos = false;
  faculties = [];
  programmes = [];
  title = '';
  hideInfo = 'hidden';
  hideProgs = 'hidden';
  currProg =
    {
      'name': '',
      'type': '',
      'part_time': false,
      'evening': false,
      'full_time': false,
      'faculty': '',
      'department': '',
      'duration': 0,
      'url': '',
      'requirements': {}
    };

  getProgs(event: any) {
    const fac_name = event.srcElement.innerText.trim();

    this.data.getProgsByFaculty(environment.faculties[fac_name])._subscribe((names: any) => {
      this.programmes = names.body;
    });
  }

  getProgInfo(event: any) {
    this.resetState();
    this.title = event.srcElement.innerText;
    const thisProg = this.programmes.filter( (obj) => (obj.name.trim() === this.title.trim()))[0];
    console.log(thisProg);
    Object.assign(this.currProg, thisProg);
    const combos = thisProg.requirements.combinations;

    if (combos.length !== 0) {
      combos.forEach((each_group) => {
        if (each_group.amt === 1) {
          if (each_group.list[0].includes('CSEC')) {
            this.hideOneCSEC = false;
            this.oneCSEC = each_group.list;
          } else {
            this.hideOneCAPE = false;
            this.oneCAPE = each_group.list;
          }
        } else {
          if (each_group.list[0].includes('CSEC')) {
            this.hideTwoCSEC = false;
            this.twoCSEC = each_group.list;
          } else {
            this.hideTwoCAPE = false;
            this.twoCAPE = each_group.list;
          }
        }
      });
    } else { this.noCombos = true; }
    this.hideInfo = 'visible';
  }

  resetState() {
    this.noCombos = false;
    this.hideOneCSEC = true; this.oneCSEC = [];
    this.hideTwoCSEC = true; this.twoCSEC = [];
    this.hideOneCAPE = true; this.oneCAPE = [];
    this.hideTwoCAPE = true; this.twoCAPE = [];
  }

  constructor(public data: DataLayerService) {}

  ngOnInit() {
    this.data.getFacultyNames()._subscribe((names: any) => {
      this.faculties = names.body;
    });
  }

}
