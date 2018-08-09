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
// import {By} from '@angular/platform-browser';

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

  // it('should display information on the right side of the screen when a programme name is clicked', () => {
  //   component.ngOnInit();
  //   setTimeout(() => {
  //     spy = spyOn(component, 'getProgInfo');
  //     const spy2 = spyOn(component, 'resetState');
  //     fixture.detectChanges();
  //     let items = fixture.debugElement.query(By.css('.mat-list-item'));
  //     console.log(items);
  //     expect(items.children.length).toBeGreaterThan(0);
  //
  //     items.children[0].nativeElement.click();
  //     expect(component.progClicked).toBe(true);
  //     expect(component.getProgInfo).toHaveBeenCalled();
  //     expect(component.resetState).toHaveBeenCalled();
  //   }, 5000);
  // });
});
