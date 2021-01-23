import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from 'src/app/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}
