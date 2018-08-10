import { Component, OnInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import { environment } from '../../environments/environment';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [DataLayerService]
})
export class ViewComponent implements OnInit {
  title: string;
  current_faculty: string;
  curr_color: string;
  faculties: string[]; // faculty listing, populated by get request onInit
  hideOneCSEC: boolean; oneCSEC: string[]; // arrays to hold the combo requirements
  hideTwoCSEC: boolean; twoCSEC: string[]; // arrays to hold the combo requirements
  hideOneCAPE: boolean; oneCAPE: string[]; // arrays to hold the combo requirements
  hideTwoCAPE: boolean; twoCAPE: string[]; // arrays to hold the combo requirements
  pendingprogs: boolean;
  top_level_view: boolean; noCombos: boolean;
  progClicked: boolean;
  filtered: any[]; programmes: any[]; // populated when user clicks on faculty name
  currProg = // programme template
    {
      'name': '',
      'type': '',
      'part_time': false,
      'full_time': false,
      'faculty': '',
      'department': '',
      'duration': 0,
      'url': '',
      description: '',
      'requirements': {
        'csec_passes': 0,
        'cape_passes': 0,
        'mandatory': [],
        'combinations': {}
      }
    };

  constructor(
    private data: DataLayerService,
    private auth: AuthService
  ) {
    this.pendingprogs = true;
    this.hideOneCSEC = true; this.oneCSEC = []; // arrays to hold the combo requirements
    this.hideTwoCSEC = true; this.twoCSEC = []; // arrays to hold the combo requirements
    this.hideOneCAPE = true; this.oneCAPE = []; // arrays to hold the combo requirements
    this.hideTwoCAPE = true; this.twoCAPE = []; // arrays to hold the combo requirements
    this.noCombos = false;
    this.progClicked = false;
    this.filtered = [];
    this.faculties = []; // faculty listing, populated by get request onInit
    this.programmes = []; // populated when user clicks on faculty name
    this.title = '';
    this.auth.data_incoming.subscribe(user => {
      if (user !== undefined ) {
        this.top_level_view = user.view && (user.faculty === 'all_faculties');
        this.curr_color = user.color;
        this.current_faculty = user.faculty;
      }
    });
  }

  /**
   * @desc Waits for the user to click on a faculty so that it can fetch all the programmes under that faculty
   * @return {undefined}
   * @param event
   * */
  getProgs(event: any) {
    this.pendingprogs = true;
    const fac_name = event.target.innerText.trim();
    if (fac_name === 'All Programmes') {
      this.data.getAllProgs().then((allProgs: any[]) => {
        this.programmes = allProgs;
        this.filtered = allProgs;
        this.pendingprogs = false;
      });
    } else {
      this.data.getProgsByFaculty(environment.faculties[fac_name]).then((names: any[]) => {
        this.pendingprogs = false;
        this.programmes = names;
        this.filtered = names;
      }, (error: any) => { console.log(error); });
    }
  }

  /**
   * @desc Waits on a user to click on a programme name so that all the data can be fetched and displayed on the right
   * @param event
   * */
  getProgInfo(event: any) {
    this.resetState();
    this.progClicked = true;
    this.title = event.target.innerText;
    const thisProg = this.programmes.filter( (obj) => (obj.name.trim() === this.title.trim()))[0];
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
  }

  /**
   * @desc Resets the arrays so that the previous values do not appear when the next set of programme info is fetched
   * @return {undefined}
   * */
  resetState() {
    this.noCombos = false;
    this.hideOneCSEC = true; this.oneCSEC = [];
    this.hideTwoCSEC = true; this.twoCSEC = [];
    this.hideOneCAPE = true; this.oneCAPE = [];
    this.hideTwoCAPE = true; this.twoCAPE = [];
  }

  filter(value) {
    if (value === '') { this.filtered = this.programmes; } else {
      const subset = [];
      this.programmes.forEach(prog => {
        if (prog.name.toLowerCase().includes(value.toLowerCase())) {
          subset.push(prog);
        }
      });
      this.filtered = subset;
    }
  }

  /**
   * @desc When the component is initialized, the list of faculty names is obtained from the server
   * @return {undefined}
   * */
  ngOnInit() {
    if (this.top_level_view) {
      this.data.getFacultyNames().then(names => {
          console.log(names);
          this.faculties = Object.values(names);
          this.faculties.unshift('All Programmes');
      }).catch(error => { console.log(error); });
      this.data.getAllProgs().then((allProgs: any[]) => {
        this.programmes = allProgs;
        this.filtered = allProgs;
        this.pendingprogs = false;
      }).catch(error => { console.log(error); });
    } else {
      this.data.getProgsByFaculty(environment.faculties[this.current_faculty]).then((names: any[]) => {
        this.pendingprogs = false;
        this.programmes = names;
        this.filtered = names;
      }).catch(error => { console.log(error); });
    }
  }
}
