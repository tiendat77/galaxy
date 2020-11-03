import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-form-input-file',
  templateUrl: './form-input-file.component.html',
  styleUrls: ['./form-input-file.component.scss']
})
export class FormInputFileComponent implements OnInit, OnChanges {
  @ViewChild('fileUpload') inputFile: ElementRef;

  @Input() label: string;
  @Input() required = false;
  @Input() type: 'csv_file' | 'csv_file_raw' = 'csv_file';

  @Input() value: any[];
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  separator = ',';
  csvName;
  csvLines: any[] = [];

  isLoading$ = new BehaviorSubject(false);

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

      this.readFile(file).then(() => {
        this.onFileLoaded();

        // clear file input
        if (this.inputFile) {
          this.inputFile.nativeElement.value = null;
        }
      });
    }
  }

  onFileDrop(files: FileList) {
    if (files && files.length && files[0]) {

      this.readFile(files[0]).then(() => {
        this.onFileLoaded();
      });
    }
  }

  onFileLoaded() {
    if (!this.csvLines.length) {
      this.notify.notify('DATA.IMPORT.NOTIFY.EMPTY_FILE');
      return;
    }

    // TODO: check type
    this.valueChange.emit(this.csvLines);
  }

  onLoadFileFail() {
    this.csvName = undefined;
    this.csvLines = [];
    this.isLoading$.next(false);
  }

  clearFile(event) {
    event.stopPropagation();

    this.csvName = undefined;
    this.csvLines = [];
  }

  readFile(file: File) {
    return new Promise((resolve, reject) => {
      this.isLoading$.next(true);

      const type = file.type;
      const name = file.name;
      // const ext = this.getFileExtension(file.name);

      const reader = new FileReader();
      const lines: any[] = [];

      if (!file) { return; }

      if (type !== 'text/csv') {
        this.onLoadFileFail();
        this.notify.notify('DATA.IMPORT.NOTIFY.INVALID_CSV_FILE');
        resolve();
        return;
      }

      reader.onload = (event: any) => {
        const csv: string = reader.result as string;
        const allLines: any[] = csv.split(/\r\n|\n/);

        // Check file is empty
        if (allLines.length < 2) {
          this.onLoadFileFail();
          resolve();
          return;
        }

        const header: any[] = allLines.splice(0, 1)[0].split(this.separator);

        for (const row of allLines) {
          const lineData = row.split(this.separator);

          if (lineData.length === header.length) {
            lines.push(lineData);
          }
        }

        this.csvName = name;
        this.csvLines = lines;

        setTimeout(() => {
          this.isLoading$.next(false);
        }, 300);

        resolve();
      };

      reader.readAsText(file);
    });
  }

  /////////////// UTILS ///////////////
  private getFileExtension(fileName: string) {
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
