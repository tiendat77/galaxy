import { Component } from '@angular/core';

@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.scss']
})
export class FlexLayoutComponent {

  options = {
    direction :  'row',
    mainAxis  : 'space-around',
    crossAxis :  'center'
  };

  layoutAlign() {
    return `${this.options.mainAxis} ${this.options.crossAxis}`;
  }

  getStyle() {
    const styles = document.getElementById('blocks-demo').style;
    const cssStyles = styles.cssText.split(';').map(style => style.trim()).join(';\n');
    return cssStyles;
  }

}
