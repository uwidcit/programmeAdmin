import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSelectModule} from '@angular/material/select';
import {
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatToolbarModule, MatSpinner,
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ViewComponent} from './view.component';
import {Router} from '@angular/router';
const programmes = require('../mock/data.service.json');

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  // let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatListModule,
        MatCheckboxModule,
        MatChipsModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSelectModule
      ],
      declarations: [
        ViewComponent,
        MatSpinner,
      ],
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    component.programmes = programmes.all;
    component.filtered = programmes.all;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be waiting for a request on startup', () => {
    expect(component.pendingprogs).toBe(true);
  });

  it('should have no programmes that was clicked on start up', () => {
    expect(component.progClicked).toBe(false);
    expect(component.noCombos).toBe(false);
  });

  it('should filter the list of programmes by name', () => {
    expect(component.programmes.filter((element) => element.name.includes('')).length).toBe(3);
    expect(component.programmes.filter((element) => element.name.includes('Physics')).length).toBe(1);
    expect(component.programmes.filter((element) => element.name.includes('DENTAL')).length).toBe(0);
  });
});
