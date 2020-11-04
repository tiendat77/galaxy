import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @Output() fileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = 'rgb(232, 252, 255)';

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#d5e6e8';
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgb(232, 252, 255)';
  }

  @HostListener('drop', ['$event']) onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    this.fileDropped.emit(files);
    this.background = 'rgb(232, 252, 255)';
  }

}
