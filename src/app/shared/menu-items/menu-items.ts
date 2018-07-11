import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: 'home', name: 'Admin Home Page', type: 'link', icon: 'home' },
    {state: 'view', name: 'View Programmes', type: 'link', icon: 'remove_red_eye' },
];

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
