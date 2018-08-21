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
import {By} from '@angular/platform-browser';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  // let spy: any;

  const queryElement = (selector: string) => {
    return fixture.debugElement.query(By.css(selector));
  };

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('- should have basic DOM defined', () => {
    expect(queryElement('mat-toolbar')).not.toBe(null);
    expect(queryElement('#search')).not.toBe(null);
    expect(queryElement('.col-md-4')).toBe(null);
    expect(queryElement('.col-md-8')).toBe(null);
    expect(queryElement('mat-select')).toBe(null);
  });

  it('should be waiting for data on startup', () => {
    expect(component.pendingprogs).toBe(true);
  });

  it('should have no programmes that was clicked on start up', () => {
    expect(component.progClicked).toBe(false);
    expect(component.noCombos).toBe(false);
  });
});
