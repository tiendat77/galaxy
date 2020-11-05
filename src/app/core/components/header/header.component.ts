import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { MENU_ITEMS } from '../../../menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = MENU_ITEMS;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
