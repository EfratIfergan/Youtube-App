import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.scss'],
})
export class TableRecordComponent {
  constructor(private messageService: MessageService) {}
  
  products = ["444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444",
    1,11,112,232,777,776,543,23];

  
  display: boolean = false;
  displayMaximizable: boolean = false;

  showDialog() {
      this.display = true;
      this.displayMaximizable = true
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showBottomCenter()
      console.log('Text copied to clipboard');
    }, (err) => {
      console.error('Error copying text to clipboard: ', err);
    });
  }

  showBottomCenter() {
    this.messageService.add({key: 'bc', severity:'success', summary: 'Success', detail: 'Text copied'});
}
  
}
