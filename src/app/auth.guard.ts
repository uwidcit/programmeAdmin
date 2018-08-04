import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

/**
 * A simple guard that checks to see if the person is logged in. The default routes after login are '/home', '/view' and '/about'.
 * A person can simply change the url to be redirected but this auth guard prevents that from happening if the person is not logged
 * in.
 * */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.loggedIn) {
      return false;
    } else { return true; }
  }
}
