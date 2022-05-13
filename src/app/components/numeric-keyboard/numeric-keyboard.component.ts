import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrls: ['./numeric-keyboard.component.scss']
})
export class NumericKeyboardComponent {

  valueStr: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<string>();

  constructor() {}

  tip(val: 'ok'|'cancel'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'0') {
    if (val === 'cancel') {
      this.valueStr = '';
      this.valueChange.next(this.valueStr);
    } else if (val === 'ok') {
      if(this.valueStr !== '') {
        this.validate.next(this.valueStr);
        this.valueStr = '';
      }
    } else {
      this.valueStr += val;
      this.valueChange.next(this.valueStr);
    }
  }

}
