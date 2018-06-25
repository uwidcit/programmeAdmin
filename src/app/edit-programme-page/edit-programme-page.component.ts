import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {DemoColor} from '../material-component/chips/chips.component';
import {ENTER, COMMA} from '@angular/cdk/keycodes' ;

@Component({
  selector: 'app-edit-programme-page',
  templateUrl: './edit-programme-page.component.html',
  styleUrls: ['./edit-programme-page.component.css']
})
export class EditProgrammePageComponent implements OnInit {
  // 3 vars below are for the state of the check boxes
  ptChecked = true;
  ftChecked = true;
  eveningChecked = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  programmes = ['Programme 1', 'Programme 2', 'Programme 3', 'Programme 4', 'Programme 5', 'Programme 6', 'Programme 7', 'Programme 8'];
  title = '';
  hideInfo = 'hidden';
  hideProgs = 'hidden';

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  generalReqs = [];
  csecSubs = [];
  capeSubs = [];

  availableColors: DemoColor[] = [
    { name: 'none', color: 'gray' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  getProgInfo(event: any) {
    // Make a request to get all the requirements for this programme
    this.title = event.srcElement.innerText;
    this.hideInfo = 'visible';
  }


  addGenReq(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.generalReqs.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeGenReq(fruit: any): void {
    const index = this.generalReqs.indexOf(fruit);

    if (index >= 0) {
      this.generalReqs.splice(index, 1);
    }
  }

  addCSECReq(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.csecSubs.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCSECReq(fruit: any): void {
    const index = this.csecSubs.indexOf(fruit);

    if (index >= 0) {
      this.csecSubs.splice(index, 1);
    }
  }

  addCAPEReq(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.capeSubs.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCAPEReq(fruit: any): void {
    const index = this.capeSubs.indexOf(fruit);

    if (index >= 0) {
      this.capeSubs.splice(index, 1);
    }
  }



  constructor() { }

  ngOnInit() {
  }

}
