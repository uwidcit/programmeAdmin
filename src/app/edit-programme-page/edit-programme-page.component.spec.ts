import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgrammePageComponent } from './edit-programme-page.component';

describe('EditProgrammePageComponent', () => {
  let component: EditProgrammePageComponent;
  let fixture: ComponentFixture<EditProgrammePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgrammePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgrammePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
