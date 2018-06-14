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
