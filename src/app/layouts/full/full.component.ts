import { MediaMatcher } from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import {Router, NavigationEnd} from '@angular/router';
import {AuthService} from '../../auth.service';
/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: [],
  providers: [AuthService]
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  hidebtn: boolean;
  fac_name: string;

  private _mobileQueryListener: () => void;

  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      public menuItems: MenuItems,
      public router: Router,
      private auth: AuthService) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.hidebtn = (val.url === '/login');
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.hidebtn = true;
  }

  signOut() {
    this.auth.signout();
    this.router.navigate(['/login']);
  }

}
