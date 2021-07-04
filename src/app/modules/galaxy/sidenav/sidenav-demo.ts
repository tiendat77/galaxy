import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-sidenav-demo',
  templateUrl: './sidenav-demo.html',
  styleUrls: ['./sidenav-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySidenavDemoComponent implements OnInit {

  id = 'ui/sidenav';

  html = `
  <galaxy-sidenav #sidenav class="sidenav" align="right">
    <div class="sidenav-header">
      <a class="brand">
        <span class="brand-name">Galaxy Sidenav</span>
      </a>
    </div>

    <hr class="horizontal">

    <div class="sidenav-main">
      <ul class="navbar-nav">
        <li>
          <a>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            </span>
            <span>Settings</span>
          </a>
        </li>

        <li>
          <a>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"/></svg>
            </span>
            <span>Accounts</span>
          </a>
        </li>
      </ul>
    </div>
  </galaxy-sidenav>

  <button galaxy-raised-button (click)="sidenav.open()">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    <span style="margin-left: 8px;">Open sidenav</span>
  </button>
  `;
  sass = `
  .sidenav {
    hr.horizontal {
      opacity: .25;
      border: 0;
      height: 1px;
      margin: 1rem 0;
      background-color: transparent;
      background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.4),transparent);
    }

    .sidenav-header {
      .brand {
        cursor: pointer;
        display: block;
        padding: 1.5rem 2rem;
        text-align: center;
      }

      .brand-name {
        color: var(--color-green);
        font-weight: 600;
        margin-left: 0.25rem;
      }
    }

    .sidenav-main {
      overflow: auto;

      ul.navbar-nav>li {
        border-radius: 10px;

        a {
          align-items: center;
          box-sizing: border-box;
          cursor: pointer;
          color: #3c4043;
          display: flex;
          padding: 12px 6px;
          outline: 0;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .icon {
          border: none;
          display: table-cell;
          vertical-align: middle;
          line-height: 24px;
          height: 24px;
          width: 24px;
          padding: 0 8px;

          svg {
            width: 24px;
            height: 24px;
            fill: #3c4043;
          }
        }

        &:hover {
          background-color: #f7f8f8;

          a {
            color: var(--color-green);
          }

          .icon svg {
            fill: var(--color-green);
          }
        }
      }
    }
  }
  `;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
