import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-terminal-demo',
  templateUrl: './terminal-demo.html',
  styleUrls: ['./terminal-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTerminalDemoComponent implements OnInit {

  id = 'ui/terminal';

  html = `
  <galaxy-terminal [height]="236">
    <div class="about-me">
      <p>
        <em>const&nbsp;</em>
        <span class="text-green">&nbsp;aboutMe&nbsp;</span>
        <span class="text-pink">&nbsp;=&nbsp;</span>
        <em>&nbsp;function&nbsp;</em>
        <span>()</span>
        <span>&nbsp;{{ '{' }}&nbsp;</span>
      </p>
      <p>
        <span>&nbsp;&nbsp;</span>
        <em class="text-pink">return&nbsp;</em>
        <span>&nbsp;{{ '{' }}&nbsp;</span>
      </p>
      <p>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>name:&nbsp;&nbsp;</span>
        <span class="text-yellow">'Tiến Đạt Huỳnh'</span>,
      </p>
      <p>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>position:&nbsp;&nbsp;</span>
        <span class="text-yellow">'Front-end Developer'</span>,
      </p>
      <p>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>website:&nbsp;&nbsp;</span>
        <a class="text-yellow" href="https://galaxy-tiendat77.vercel.app/dashboard" target="_blank">
          'https://tiendathuynh.com'
        </a>,
      </p>
      <p>
        <span>&nbsp;&nbsp;{{ '}' }}</span>
      </p>
      <p>
        <span>{{ '}' }}</span>
      </p>
    </div>
  </galaxy-terminal>
  `;
  sass = `
  .about-me {
    p {
      margin: 0;
      white-space: nowrap;
      line-height: 1.5;
      letter-spacing: 0.1em;
    }

    em {
      color: #63b3ed;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--color-green);
      }
    }

    .text-green {
      color: #68d391;
    }

    .text-pink {
      color: #ed64a6;
    }

    .text-yellow {
      color: #faf089;
    }
  }
  `;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
