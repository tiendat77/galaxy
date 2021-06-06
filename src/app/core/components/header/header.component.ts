import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { NavigationItem } from '../../interfaces/navigation-item';
import { GALAXY_HEADER_MENU } from '../../configs/header-navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: NavigationItem[];
  user;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.menuItems = GALAXY_HEADER_MENU;
    this.user = this.auth.user$.value;
  }

}
