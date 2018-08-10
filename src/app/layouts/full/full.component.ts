import { MediaMatcher } from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

/**
 * This is the overall wrapper of this Angular Material Design template.
 * All other components and routing between them exists inside this Full Component.
 * This is only instantiated once throughout the lifecycle of the application.
 * */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: [],
  providers: [AuthService]
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  mobileQuery: MediaQueryList;
  /**
   * This will either show or hide the sidebar menu button and the sign out button
   * based on the current route. By default, these buttons should be hidden on the
   * login page and shown at all other times.
   * */
  showbtn: boolean;
  /**
   * This is a hex value represented as a string showing the faculty colour of the
   * administrator currently logged in. A top-level administrator will have the default
   * angular primary colour.
   * */
  topBarColor: string;

  private _mobileQueryListener: () => void;

  /**
   * The application defaults to the login page when first started. Hence the top
   * bar colour is set to rgb(30,136,229). If a user is already logged in, then
   * the top bar colour will be changed. The constructor also sets up the required
   * listeners for dynamically changing the sidebar and determining whether or not
   * the menu and sign out buttons should be hidden
   * */
  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      public menuItems: MenuItems,
      public router: Router,
      private auth: AuthService) {
    this.showbtn = false;
    this.topBarColor = 'rgb(30,136,229)';
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.auth.data_incoming.subscribe(user => {
      if (user !== undefined) {
        this.showbtn = true;
        this.topBarColor = user.color;
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Takes the user back to the login page, and removes the authenticated state
   * from the application. Also resets the top bar colour.
   * */
  signOut() {
    this.auth.signout();
    this.showbtn = false;
    this.router.navigate(['/login']);
    this.topBarColor = 'rgb(30,136,229)';
  }

}
