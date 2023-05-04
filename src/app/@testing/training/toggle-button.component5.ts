import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { IonButton } from "@ionic/angular";


/** DEV REMARKS
 * - component should warn (console) instead of throw exception, in relation to:
 *    - missing or not unique <ion-button> element
 *    - if 'checked' is an array and 'value' is not defined
 *    - if property 'fill' is used on the inner <ion-button>. The 'fill' property will be used internally to render the checked state.
 *
 * - lifecycles:
 *    - ngOnChanges - ngOnInit (input props available, ContentChild(ren) not available!) - ngAfterContentInit (ContentChild(ren) available!) - ngAfterViewInit
 *    - @HostListner will fire after the ng-content listener (on the <ion-button>), due to bubbling up. But listeners on the <ion-button> shouldn't generally be required (let the possibility open with a 'preventDefaultClick' property which default to true...)
 */

/**
 * PROPS:
 *  - checked: boolean | (string | number)[]. Optional. Default: false. Responsive
 *  - disabled: boolean. Optional. Default: false. Responsive
 *  - ionButtonOptions: a object of ionButtons key-value pairs. Optional. Default: undefined.
 *    Note that the 'fill' property cannot / shouldn't be used since it is needed for the _isChecked property rendering.
 */


export type CheckedInput = boolean | ValueInput[]
export type ValueInput = string | number | undefined;


@Component({
  selector: 'app-toggle-button',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      border: 1px solid gray;
      justify-content: center;
      min-width: 35px;
      width: 70%;
    }

    :host ::ng-deep ion-button {
      width: 100%;
    }
  `]
})
export class ToggleButtonComponent5 implements OnChanges, AfterContentInit {

  @ContentChildren(IonButton) ionButtonElements!: QueryList<IonButton>;

  @Input('checked')
  checkedInput: CheckedInput = false;

  @Input('value')
  valueInput?: string | number | undefined;

  @Output('checkedChange')
  checkedChangeOutput = new EventEmitter<CheckedInput>();

  private ionButton!: IonButton;

  get checked(): boolean {
    if (Array.isArray(this.checkedInput)) {
      return this.checkedInput.includes(this.valueInput);
    }

    return this.checkedInput;
  }

  get fill(): 'solid' | 'outline' {
    return this.checked ? 'solid' : 'outline';
  }


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if ( (changes['checkedInput'] || changes['valueInput']) && this.ionButton) {
      this.ionButton.fill = this.fill
    }
  }

  ngAfterContentInit() {
    console.log('after content init')

    if (this.ionButtonElements.length !== 1) {
      // throw new Error(`Invalid 'ion-button' children count, should be exactly 1: count: ${this.ionButtonElements.length}`)
      console.warn(`It should be only one 'ion-button' child... only the first child will render correctly!`)
    }

    this.ionButton = this.ionButtonElements.first;
    this.ionButton.fill = this.fill;
  }

  @HostListener('click')
  onToggle() {
    if (Array.isArray(this.checkedInput) && this.checkedInput.includes(this.valueInput)) {
      this.checkedInput = this.checkedInput.filter(m => m !== this.valueInput);
    } else if (Array.isArray(this.checkedInput) && !this.checkedInput.includes(this.valueInput)) {
      this.checkedInput = [...this.checkedInput, this.valueInput]
    } else {
      this.checkedInput = !this.checkedInput;
    }

    this.checkedChangeOutput.emit(this.checkedInput)
    this.ionButton.fill = this.fill;
  }

}








// type CheckedModeBoolean = { tag: 'CheckedModeBoolean', checked: boolean };
// type CheckedModeArray = { tag: 'CheckedModeArray', checked: (string|number)[], value: string|number };
// type CheckedModeInvalid = { tag: 'CheckedModeInvalid' };

// type CheckedMode = CheckedModeArray | CheckedModeBoolean | CheckedModeInvalid;
// type CheckedInput = boolean | (string | number)[]
// type ValueInput = string | number | undefined;



// const checkedMode = (checked: CheckedInput, value: ValueInput): CheckedMode => {
//   if (typeof(checked) === 'boolean') {
//     return { tag: 'CheckedModeBoolean', checked }
//   }

//   if (Array.isArray(checked) && value !== undefined) {
//     return { tag: 'CheckedModeArray', checked, value }
//   }

//   console.warn(`ToggleButtonComponent: Incompatible 'checked' and 'value' properties. 'Checked' is an array: ${checked} but 'value' is undefined: ${value}`)
//   return { tag: 'CheckedModeInvalid' };
// }

// const toBoolean = (checked: CheckedInput, value?: ValueInput): boolean => {
//   const mode = checkedMode(checked, value);
//   switch (mode.tag) {
//     case 'CheckedModeBoolean':
//       return mode.checked;
//     case 'CheckedModeArray':
//       return mode.checked.includes(mode.value);
//     case 'CheckedModeInvalid':
//       // always returns 'false' without throwing error. E.g: val [1,2,3] or [1,2,3 undefined] returns 'false'
//       return false;
//   }
// }

// const toCheckedInput = (checked: boolean, value?: ValueInput): CheckedInput => {
//   const mode = checkedMode(checked, value);

//   switch (mode.tag) {
//     case 'CheckedModeBoolean':
//       return checked;

//     case 'CheckedModeArray':
//       return value ? [...mode.checked, mode.value] : mode.checked.filter(m => m !== mode.value);

//     case 'CheckedModeInvalid':
//       // always returns 'false' without throwing error.
//       return false;
//   }
// }




// @Component({
//   selector: 'app-toggle-button',
//   template: `
//     <ng-content></ng-content>
//   `,
//   styles: [`
//     :host {
//       display: inline-flex;
//       align-items: center;
//       border: 1px solid gray;
//       justify-content: center;
//       min-width: 35px;
//       width: 70%;
//     }

//     :host ::ng-deep ion-button {
//       width: 100%;
//     }
//   `]
// })
// export class ToggleButtonComponent implements AfterContentInit {

//   // @ContentChild(IonButton, {read: ElementRef}) ionButtonEl!: ElementRef<HTMLElement>;
//   // @ContentChild(IonButton) ionButton?: IonButton;
//   @ContentChildren(IonButton) ionButtonElements!: QueryList<IonButton>;

//   @Input('checked')
//   checkedInput: CheckedInput = false;

//   @Input('value')
//   valueInput?: string | number;

//   @Output('checkedChange')
//   checkedChangeOutput = new EventEmitter<boolean | (string|number)[]>();

//   get checked(): boolean {
//     return toBoolean(this.checkedInput, this.valueInput);
//   }

//   set checked(val: boolean) {
//     const mode = checkedMode(this.checkedInput, this.valueInput);
//     switch (mode.tag) {
//       case 'CheckedModeBoolean': {
//         this.checkedInput = mode.checked;
//         break;
//       }
//       case 'CheckedModeArray': {
//         this.checkedInput = mode.checked;
//         this.valueInput = mode.value;
//         break;
//       }
//       case 'CheckedModeInvalid': {
//         // what to do?????
//       }
//     }
//   }


//   constructor(private renderer: Renderer2, private el: ElementRef) {}


//   ngAfterContentInit() {
//     console.log('after content init')
//   }

//   @HostListener('click')
//   onToggle() {
//     const checked = toBoolean(this.checkedInput);
//     this.checkedInput = toCheckedInput(checked);
//     // this.renderChecked = checked;
//     this.checkedChangeOutput.emit(this.checkedInput);
//   }

// }



