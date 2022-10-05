//   PROPS:
//   - checked: boolean | (string | number)[], optional
//   - value: string | number, optional
//   - ion-button-props: Partial<IonButton>

//   EVENTS:
//   - checkedChange: boolean | (string | number)[]

//   Usage:
//   Use ion-button-props attribute to style the wrapped ion-button (e.g size, color, etc...)
//
//   WITH BOOLEAN BINDING
//   <app-toggle-button [checked]="someBoolean" (checkedChange)="onUpdate($event)"></app-toggle-button>
//   <app-toggle-button [(checked)]="someBoolean"></app-toggle-button>

//   WITH ARRAY BINDING, A VALUE PROPERTY MUST BE GIVEN TO WORK PROPERLY...
//   <app-toggle-button [checked]="someArray" (checkedChange)="onUpdate($event)" [value]="someStringOrNumber"></app-toggle-button>
//   <app-toggle-button [(checked)]="someArray" [value]="someStringOrNumber"></app-toggle-button>

//   STANDALONE: BUTTON WORKS AS STANDALONE BUTTON FOR RENDERING ONLY (IT RENDERS FALSE AT THE BEGINNING)

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IonButton } from '@ionic/angular';
import { addPropsToRefs } from '../models/Utils';

@Component({
  selector: 'app-toggle-button',
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
  template: `
    <ion-button
      #ionButtonRef
      [fill]="isChecked ? 'solid' : 'outline'"
      (click)="onToggle()"
    >
      <ng-content></ng-content>
    </ion-button>
  `,
})
export class ToggleButtonComponent implements AfterViewInit {
  @ViewChildren('ionButtonRef') ionButtonRefs!: QueryList<IonButton>;

  @Input('ion-button-props') ionButtonProps?: Partial<IonButton>;

  @Input('checked') inputChecked?: boolean | (string | number)[];

  @Input('value') inputValue?: string | number;

  @Output('checkedChange') outputCheckedChange = new EventEmitter<
    boolean | (string | number)[]
  >();

  private _standaloneChecked = false;

  get isChecked(): boolean {
    return this._isChecked(
      this.inputChecked,
      this._standaloneChecked,
      this.inputValue
    );
  }

  ngAfterViewInit(): void {
    addPropsToRefs(this.ionButtonProps, this.ionButtonRefs);
  }

  onToggle() {
    let newChecked: boolean | (string | number)[];

    if (this.inputChecked === undefined) {
      this._standaloneChecked = !this._standaloneChecked;
    }

    if (typeof this.inputChecked === 'boolean') {
      newChecked = !this.inputChecked;
      this.outputCheckedChange.emit(newChecked);
    }

    if (Array.isArray(this.inputChecked) && !!this.inputValue) {
      newChecked = [...this.inputChecked];
      if (newChecked.includes(this.inputValue)) {
        newChecked = newChecked.filter((v) => v !== this.inputValue);
      } else {
        newChecked.push(this.inputValue);
      }
      this.outputCheckedChange.emit(newChecked);
    }
  }

  private _isChecked(
    inputChecked: boolean | (string | number)[] | undefined,
    standaloneChecked: boolean,
    inputValue: string | number | undefined
  ): boolean {
    if (inputChecked === undefined) {
      return standaloneChecked;
    }

    if (typeof inputChecked === 'boolean') {
      return inputChecked;
    }

    if (
      Array.isArray(inputChecked) &&
      inputValue !== undefined &&
      inputChecked.includes(inputValue)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
