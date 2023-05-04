import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";


/**
 * PROPS:
 *  - checked: boolean | (string | number)[]. Optional. Default: false. Responsive
 *  - disabled: boolean. Optional. Default: false. Responsive
 *  - ionButtonOptions: a object of ionButtons key-value pairs. Optional. Default: undefined.
 *    Note that the 'fill' property cannot / shouldn't be used since it is needed for the _isChecked property rendering.
 */



type Checked = boolean | (string|number)[];

// type CheckedModeStandalone = {tag: 'CheckedModeStandalone', checked: boolean};
type CheckedModeBoolean = {tag: 'CheckedModeBoolean', checked: boolean};
type CheckedModeArray = {tag: 'CheckedModeArray', checked: (string|number)[], value: string|number};
type Mode = CheckedModeArray | CheckedModeBoolean;


@Component({
  selector: 'app-toggle-button2',
  template: `
    <ion-button [fill]="ionButtonFill" (click)="onToggle()">
      <ng-content></ng-content>
    </ion-button>
  `,
  styles: [`

  `]
})
export class ToggleButtonComponent2 {

  @Input()
  checked: boolean | (string|number)[] = false;

  // private _checked: boolean = false;
  // @Input()
  // get checked(): boolean { return this._checked };
  // set checked(val: boolean) {
  //   this._checked = val;
  //   console.log(`checked has changed! newval: ${val}`)
  //   console.log(`this._checked: ${this._checked}`)
  // }

  @Input()
  value?: string | number;

  @Output()
  checkedChange = new EventEmitter<boolean | (string|number)[]>();

  get ionButtonFill(): 'solid' | 'outline' {
    const mode = this.getMode();
    switch (mode.tag) {
      case 'CheckedModeBoolean':
        return mode.checked ? 'solid' : 'outline';

      case 'CheckedModeArray':
        return mode.checked.includes(mode.value) ? 'solid' : 'outline';
    }
  }

  onToggle() {
    // Assigning manually this.checked = newChecked, a second assignement take place if the 'checked' property is two-way bound...
    // but it makes sure it works as standalone mode (if the property isn't bound, the button will toggle anyway).

    const mode = this.getMode()
    switch (mode.tag) {
      case 'CheckedModeBoolean':
      {
        const newChecked = !mode.checked;
        this.checkedChange.emit(newChecked);
        this.checked = newChecked;
        break;
      }

      case 'CheckedModeArray':
      {
        const newChecked = mode.checked.includes(mode.value) ? mode.checked.filter(val => val !== mode.value) : [...mode.checked, mode.value];
        this.checkedChange.emit(newChecked);
        this.checked = newChecked;
        break;
      }
    }
  }

  private getMode(): Mode {
    const checked = this.checked;
    const value = this.value;

    if (typeof(checked) === 'boolean') {
      return { tag: 'CheckedModeBoolean', checked }
    }

    else if (Array.isArray(checked) && value !== undefined) {
      return { tag: 'CheckedModeArray', checked, value }
    }

    else {
      throw new Error(`'checked' or 'value' property is not valid`)
    }
  }






  // private _checked: Checked = false;
  // private _value?: string | number;

  // @Input('checked') checkedInput?: Checked;

  // @Input('value') valueInput?: string | number;

  // @Output('checkedChange') checkedChangeOutput = new EventEmitter<Checked>();

  // get ionButtonFill(): 'solid' | 'outline' {
  //   const checked = this._checked;
  //   return checked ? 'solid' : 'outline';
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if ('checkedInput' in changes) {
  //     console.log('checkedInput changed!')
  //     const newChecked = this.checkedInput as Checked;
  //     this._checked = newChecked;
  //   }
  //   if ('valueInput' in changes) {
  //     console.log('valueInput changed!')
  //     const newValue = this.valueInput as string|number;
  //     this._value = newValue;
  //   }
  // }

  // // onToggle() {
  // //   if (this.checkedInput !== undefined) {
  // //     this.checkedChangeOutput.emit(!this.checkedInput)
  // //   } else {
  // //     const newChecked = !this._checked;
  // //     this._checked = newChecked;
  // //     this.checkedChangeOutput.emit(newChecked);
  // //   }
  // // }

  // onToggle() {
  //   const mode = this.getMode();
  //   switch (mode.tag) {
  //     case 'CheckedModeStandalone':
  //     {
  //       const newChecked = !this._checked;
  //       this._checked = newChecked;
  //       this.checkedChangeOutput.emit(newChecked);
  //       break;
  //     }

  //     case 'CheckedModeBoolean':
  //     {
  //       const newChecked = !this.checkedInput!
  //       this.checkedChangeOutput.emit(newChecked);
  //       break;
  //     }

  //     case 'CheckedModeArray':
  //     {
  //       const isChecked = mode.checked.includes(mode.value);
  //       if (isChecked) {
  //         const newChecked = mode.checked.filter(item => item !== mode.value)
  //         this.checkedChangeOutput.emit(newChecked);
  //       }
  //     }
  //   }
  // }

  // private getMode(): Mode {
  //   if (this.checkedInput === undefined) {
  //     if (typeof(this._checked) !== 'boolean') {
  //       throw new Error(`Mode Error: Standalone`);
  //     }
  //     return {tag: 'CheckedModeStandalone', checked: this._checked};
  //   }

  //   if (typeof(this.checkedInput) === 'boolean') {
  //     if (typeof(this._checked) !== 'boolean') {
  //       throw new Error(`Mode Error: Boolean`);
  //     }
  //     return {tag: 'CheckedModeBoolean', checked: this._checked};
  //   }


  //     if (!Array.isArray(this._checked) || this._value === undefined) {
  //       throw new Error(`Mode Error: Array`);
  //     }
  //     return {tag: 'CheckedModeArray', checked: this._checked, value: this._value}
  // }

}
