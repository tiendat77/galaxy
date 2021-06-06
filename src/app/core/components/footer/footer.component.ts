import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationItem } from '../../interfaces/navigation-item';
import { GALAXY_PAGES, AUTHOR_CONTACTS } from '../../configs/footer-navigation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public year: number;
  public pages: NavigationItem[];
  public contacts: NavigationItem[];

  constructor() { }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.pages = GALAXY_PAGES;
    this.contacts = AUTHOR_CONTACTS;
    this.year = new Date().getFullYear();
  }

}
