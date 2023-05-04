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



type CheckedModeBoolean = { tag: 'CheckedModeBoolean', checked: boolean };
type CheckedModeArray = { tag: 'CheckedModeArray', checked: (string|number)[], value: string|number };
type CheckedModeInvalid = { tag: 'CheckedModeInvalid' };

type CheckedMode = CheckedModeArray | CheckedModeBoolean | CheckedModeInvalid;
type CheckedInput = boolean | (string | number)[]


@Component({
  selector: 'app-toggle-button-4',
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
export class ToggleButtonComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {

  // @ContentChild(IonButton, {read: ElementRef}) ionButtonEl!: ElementRef<HTMLElement>;
  // @ContentChild(IonButton) ionButton?: IonButton;
  @ContentChildren(IonButton) ionButtonElements!: QueryList<IonButton>;

  @Input('checked')
  checkedInput: CheckedInput = false;

  @Input('value')
  valueInput?: string | number;

  @Output('checkedChange')
  checkedChangeOutput = new EventEmitter<boolean | (string|number)[]>();



  constructor(private renderer: Renderer2, private el: ElementRef) {}



  ngOnChanges(changes: SimpleChanges) {
    console.log('on changes')
    console.log(changes)
  }

  ngOnInit() {
    console.log('on init')
    console.log(this.ionButton)
  }

  ngAfterContentInit() {
    console.log('after content init')

    if (this.ionButton) {
      this._warnIonButtonProps(this.ionButtonElements)
      this.renderIonButton(this.checkedInput);
    }
  }

  ngAfterViewInit(): void {
    console.log('after view init')
  }

  @HostListener('click')
  onHostClick() {
    const checked = !this.toBoolean(this.checkedInput);
    this.checkedInput = this.toCheckedInput(checked);
    this.renderIonButton(this.checkedInput);
    this.checkedChangeOutput.emit(this.checkedInput);
  }



  private renderIonButton(checkedInput: CheckedInput) {
    if (this.ionButton) {
      const fill = this.toBoolean(checkedInput) ? 'solid' : 'outline'
      this.ionButton.fill = fill;
    }
  }

  private checkedMode(): CheckedMode {
    const checked = this.checkedInput;
    const value = this.valueInput;

    if (typeof(checked) === 'boolean') {
      return { tag: 'CheckedModeBoolean', checked }
    }

    if (Array.isArray(checked) && value !== undefined) {
      return { tag: 'CheckedModeArray', checked, value }
    }

    console.warn(`ToggleButtonComponent: Incompatible 'checked' and 'value' properties. 'Checked' is an array: ${checked} but 'value' is undefined: ${value}`)
    return { tag: 'CheckedModeInvalid' };
  }

  private toBoolean(val: CheckedInput): boolean {
    const mode = this.checkedMode();
    switch (mode.tag) {
      case 'CheckedModeBoolean':
        return mode.checked;
      case 'CheckedModeArray':
        return mode.checked.includes(mode.value);
      case 'CheckedModeInvalid':
        // always returns 'false' without throwing error. E.g: val [1,2,3] or [1,2,3 undefined] returns 'false'
        return false;
    }
  }

  private toCheckedInput(val: boolean): CheckedInput {
    const mode = this.checkedMode();

    switch (mode.tag) {
      case 'CheckedModeBoolean':
        return val;

      case 'CheckedModeArray':
        return val ? [...mode.checked, mode.value] : mode.checked.filter(m => m !== mode.value);

      case 'CheckedModeInvalid':
        // always returns 'false' without throwing error.
        return false;
    }
  }


  private _warnIonButtonProps(ionButtons: QueryList<IonButton>) {
    const ionButton = this.uniqueIonButton(ionButtons);
    const warnMessages: Partial<Record<keyof IonButton, string>> = {
      'fill': "The 'fill' property is internally used in relation to the checked property",
      'expand': "The 'expand' property will be ignored."
    }

    for (const key in warnMessages) {
      const k = key as keyof typeof warnMessages;
      if (ionButton && ionButton[k]) {
        const mainMessage = `ToggleButtonComponent: Property '${k}' shouldn't be used on <ion-button> child. `
        const propMessage = warnMessages[k];
        console.warn(mainMessage + propMessage)
      }
    }
  }

  private uniqueIonButton(ionButtons: QueryList<IonButton>): IonButton | undefined {
    const count = ionButtons.length;
    return count === 0 ? undefined : ionButtons.first;
  }


  private warnIonButton(ionButtons: QueryList<IonButton>) {
    const ionButton = this.uniqueIonButton(ionButtons);
    const count = ionButtons.length;

    const warningPrefix = 'ToggleButtonComponent warning'
    const warnings = {
      childMissing: "No <ion-button> child found...",
      tooManyChildren: `Too many <ion-button> children found: ${count}. Rendering will only apply on the first one.`,
      props: {
        'fill': "The 'fill' property will be overriden. It is internally used in relation to the component checked status",
        'expand': "The 'expand' property will be ignored."
      }
    }



    function warnChildMissing(ionButton: IonButton | undefined): asserts ionButton is IonButton {
      if (ionButtons.length === 0)
      console.warn(`No <ion-button> child found... rendering may be eroneous`)
      return;
    }

    function warnTooManyChildren() {
      if (count > 1)
      console.warn(`Too many <ion-button> children found: ${count}. Rendering will only apply on the first one.`);
    }


    warnChildMissing(ionButton)
    warnTooManyChildren()

    if (ionButton === undefined) {
      console.warn(`No <ion-button> child found... rendering may be eroneous`)
      return;
    }


    if (count > 1)
      console.warn(`Too many <ion-button> children found: ${count}. Rendering will only apply on the first one.`);

    for (let key in propWarnings) {
      if (ionButton[key] !== undefined) {

      }
    }

  }

}
