import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-avatar-demo',
  templateUrl: './avatar-demo.html',
  styles: [`
    .avatar-demo {
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyAvatarDemoComponent implements OnInit{

  id = 'ui/avatar';

  html = `
  <galaxy-avatar
    class="avatar-demo"
    source="assets/images/default-avatar.jpg">
  </galaxy-avatar>

  <galaxy-avatar
    class="avatar-demo"
    source="https://cdn.dribbble.com/users/724973/screenshots/6417933/bullshit-dribbble.png">
  </galaxy-avatar>

  <galaxy-avatar
    class="avatar-demo"
    diameter="100"
    name="Tien Dat">
  </galaxy-avatar>
  `;
  sass = `
  .avatar-demo {
    margin-bottom: 1rem;
  }
  `;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
