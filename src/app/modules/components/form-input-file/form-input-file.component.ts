import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { read } from 'fs';

import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-form-input-file',
  templateUrl: './form-input-file.component.html',
  styleUrls: ['./form-input-file.component.scss']
})
export class FormInputFileComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() required = false;

  @Input() value: any[];
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  separators = [
    // TODO: translate
    { name: 'semi-colon', value: ';' },
    { name: 'comma', value: ',' }
  ];
  separator: ',' | ';' = ',';

  selectedFile = {
    name: undefined,
    value: []
  };

  constructor(
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.readFile(file);
    }
  }

  onFileDrop(files: FileList) {
    if (files && files.length && files[0]) {
      this.readFile(files[0]);
    }
  }

  clearFile() {
    this.selectedFile.name = undefined;
    this.selectedFile.value = [];
  }

  readFile(file: File) {
    const type = file.type;
    const name = file.name;
    const ext = this.getFileExtension(file.name);

    this.selectedFile.name = name;

    const reader = new FileReader();
    const header: any[] = [];
    const rows: any[] = [];

    if (!file) { return; }

    if (type !== 'text/csv') {
      this.notify.notify('Nhap file csv thoi ban ey!!!!');
      return;
    }

    reader.onload = (event: any) => {
      const result: string = reader.result as string;
      const list: any[] = result.split(/\r\n|\n/);

      header.push(...list.splice(0, 1));

      for (const row of list) {
        const rowData = row.split(this.separator);
        rows.push(rowData);
      }

      console.log('hehehe');
    };

    reader.readAsText(file);
    console.log({header, rows});
  }

  /////////////// UTILS ///////////////
  getFileExtension(fileName: string) {
    if (!fileName || !fileName.length) {
      return '';
    }

    const splits: string[] = fileName.split('.');
    if (!splits.length) {
      return '';
    }

    return splits[splits.length - 1].toString().trim();
  }

}
