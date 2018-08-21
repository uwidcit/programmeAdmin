import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsComponent } from './subjects.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {Mockdata} from '../mock/mock-data';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsComponent ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatRadioModule
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('- should be created', () => {
    expect(component).toBeTruthy();
  });

  it('- should have basic DOM elements', () => {
    expect(fixture.debugElement.query(By.css('.mat-card'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('p'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('h2'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('input'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('.mat-radio-button'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('mat-radio-group')).children.length).toBe(3);

    expect(fixture.debugElement.query(By.css('table'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('.table thead tr')).children.length).toBe(2);
    expect(fixture.debugElement.query(By.css('.table tbody')).children.length).toBe(0);
  });

  it('- should update the DOM when given subject data', () => {
    component.subjects = Mockdata.subs.good;
    component.filtered = Mockdata.subs.good;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.table tbody ')).children.length).toBe(10);
  });

  // it('- should filter the subject list when a radio button is clicked on', async () => {
  //   component.subjects = Mockdata.subs.good;
  //   component.filtered = Mockdata.subs.good;
  //   // spyOn(component, 'filter');
  //   spyOn(component, 'subjectFilter');
  //   fixture.detectChanges();
  //   const radioButtons = fixture.debugElement.nativeElement.querySelector('.mat-radio-group').children;
  //   radioButtons[1].click();
  //   fixture.detectChanges();
  //
  //   fixture.whenStable().then(
  //     (data) => {
  //       console.log(data);
  //       expect(component.subjectFilter).toHaveBeenCalledWith('CSEC');
  //       expect(component.filtered).toBe(Mockdata.filterSubs.csec_subs);
  //       expect(fixture.debugElement.query(By.css('.table tbody ')).children.length).toBe(5);
  //     }
  //   )
  // });


});
