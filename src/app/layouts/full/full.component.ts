import { MediaMatcher } from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  mobileQuery: MediaQueryList;
  hidebtn: boolean;
  hideSignOut: boolean;
  loaded: boolean;
  fac_name: string;
  topBarColor: string;
  text_color: string;

  private _mobileQueryListener: () => void;

  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      public menuItems: MenuItems,
      public router: Router,
      private auth: AuthService) {
    this.topBarColor = 'rgb(30,136,229)';
    this.text_color = 'white';
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        console.log('something');
        this.hidebtn = (val.url === '/login');
        this.hideSignOut = (val.url !== '/login');
      }
    });
    this.auth.data_incoming.subscribe(user => {
      if (user !== undefined) {
        console.log(user);
        this.loaded = true;
        this.topBarColor = user.color;
      } else { this.loaded = false; }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.loaded = this.router.url === '/login';
  }

  signOut() {
    this.auth.signout();
    this.router.navigate(['/login']);
    this.topBarColor = 'rgb(30,136,229)';
  }

}
