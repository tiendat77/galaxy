import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'highlight'
})
export class HighLightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, search: string): any {
    if (!search) {
      return value;
    }

    const regex = new RegExp(search, 'gi');
    const replace = value.replace(regex, match => `<span style="background: yellow">${match}</span>`);

    return this.sanitizer.bypassSecurityTrustHtml(replace);
  }

}
