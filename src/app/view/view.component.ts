import {Component, OnInit} from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-page',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [DataLayerService]
})
export class ViewComponent implements OnInit {
  pendingprogs = true;
  hideOneCSEC = true; oneCSEC = []; // arrays to hold the combo requirements
  hideTwoCSEC = true; twoCSEC = []; // arrays to hold the combo requirements
  hideOneCAPE = true; oneCAPE = []; // arrays to hold the combo requirements
  hideTwoCAPE = true; twoCAPE = []; // arrays to hold the combo requirements
  noCombos = false;
  disabled = true;
  filtered = [];
  faculties = []; // faculty listing, populated by get request onInit
  programmes = []; // populated when user clicks on faculty name
  title = '';
  hideInfo = 'hidden';
  currProg = // programme template
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
      'requirements': {
        'csec_passes': 0,
        'cape_passes': 0,
        'mandatory': [],
        'combinations': {}
      }
    };
    facColour = {
      'Social Sciences': '#F36E21',
      'Engineering': '#00AEEF',
      'Food & Agriculture': '#00A54F',
      'Humanities & Education': '#0072BC',
      'Medical Sciences': '#ED028C',
      'Law': '#231F20',
      'Science & Technology': '#FCB814'
    };

  /**
   * @desc Waits for the user to click on a faculty so that it can fetch all the programmes under that faculty
   * @return {undefined}
   * @param event
   * */
  getProgs(event: any) {
    this.pendingprogs = true;
    const fac_name = event.srcElement.innerText.trim();
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
    this.title = event.srcElement.innerText;
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
    this.hideInfo = 'visible';
  }

  /**
   * @desc Resets the arrays so that the previous values do not appear when the next set of programme info is fetched
   * @return {undefined}
   * */
  resetState() {
    this.disabled = true;
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

  toggleEditable() {
    this.disabled = !this.disabled;
  }

  constructor(public data: DataLayerService) {}

  /**
   * @desc When the component is initialized, the list of faculty names is obtained from the server
   * @return {undefined}
   * */
  ngOnInit() {
    // Get all faculty names to
    this.data.getFacultyNames().then(names => {
      this.faculties = Object.values(names);
      this.faculties.unshift('All Programmes');
    });
    this.data.getAllProgs().then((allProgs: any[]) => {
      this.programmes = allProgs;
      this.filtered = allProgs;
      this.pendingprogs = false;
    });
  }
}