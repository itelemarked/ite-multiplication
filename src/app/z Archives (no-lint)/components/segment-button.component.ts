import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { IonButton } from '@ionic/angular';
import { addPropsToRefs } from '../models/Utils';

@Component({
  selector: 'app-segment-button',
  styles: [
    `
      :host {
        display: inline-block;
      }

      .btn {
        margin: 0;
        --border-width: 1px 0px 1px 1px;
      }

      .minus {
        --border-radius: 6px 0 0 6px;
        --border-width: 1px 0px 1px 1px;
      }

      .plus {
        --border-radius: 0 6px 6px 0;
        --border-width: 1px;
      }
    `,
  ],
  template: `
    <ion-button
      size="small"
      [disabled]="inputIonButtonDisabled"
      [color]="inputIonButtonColor"
      fill="outline"
      class="btn minus"
      (click)="onClick('-')"
      >-</ion-button
    >
    <ion-button
      size="small"
      [disabled]="inputIonButtonDisabled"
      [color]="inputIonButtonColor"
      fill="outline"
      class="btn plus"
      fill="outline"
      (click)="onClick('+')"
      >+</ion-button
    >
  `,
})
export class SegmentButtonComponent {

  @Input('disabled') inputIonButtonDisabled: boolean = false;

  @Input('color') inputIonButtonColor: string = 'primary';

  @Input('value') inputValue?: number;

  @Input('min') inputMin?: number;

  @Input('max') inputMax?: number;

  @Output('valueChange') outputValueChange = new EventEmitter<number>();

  onClick(type: '+' | '-') {
    const maxIsUndefined = this.inputMax === undefined;
    const minIsUndefined = this.inputMin === undefined;
    const maxIsGreaterThanValue =
      this.inputMax !== undefined &&
      this.inputValue !== undefined &&
      this.inputMax > this.inputValue;
    const minIsSmallerThanValue =
      this.inputMin !== undefined &&
      this.inputValue !== undefined &&
      this.inputMin < this.inputValue;

    if (type === '+' && (maxIsUndefined || maxIsGreaterThanValue)) {
      this.outputValueChange.emit(this.inputValue! + 1);
      return;
    }

    if (type === '-' && (minIsUndefined || minIsSmallerThanValue)) {
      this.outputValueChange.emit(this.inputValue! - 1);
      return;
    }
  }

}
