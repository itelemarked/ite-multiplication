import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { IonButton } from "@ionic/angular";


/**
 * PROPS:
 *  - checked: boolean | (string | number)[]. Optional. Default: false. Responsive
 *  - disabled: boolean. Optional. Default: false. Responsive
 *  - ionButtonOptions: a object of ionButtons key-value pairs. Optional. Default: undefined.
 *    Note that the 'fill' property cannot / shouldn't be used since it is needed for the _isChecked property rendering.
 */



type Checked = boolean | (string|number)[];

// type CheckedModeStandalone = { tag: 'CheckedModeStandalone', checked: boolean };
type CheckedModeBoolean = { tag: 'CheckedModeBoolean', checked: boolean };
type CheckedModeArray = { tag: 'CheckedModeArray', checked: (string|number)[], value: string|number };
type Mode = CheckedModeArray | CheckedModeBoolean;


@Component({
  selector: 'app-toggle-button-3',
  template: `
    <ion-button [fill]="ionButtonFill" (click)="onToggle()">
      <ng-content></ng-content>
    </ion-button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ToggleButtonComponent3 implements AfterViewInit {

  @ViewChild(IonButton) ionButtonEl!: IonButton;

  @Input('checked')
  checkedInput: boolean | (string|number)[] = false;

  @Input('value')
  valueInput?: string | number;

  @Input('ionButtonProps')
  ionButtonPropsInput?: Partial<IonButton>

  @Output('checkedChange')
  checkedChangeOutput = new EventEmitter<boolean | (string|number)[]>();

  get ionButtonFill(): 'solid' | 'outline' {
    const mode = this.getMode();
    switch (mode.tag) {
      case 'CheckedModeBoolean':
        return mode.checked ? 'solid' : 'outline';

      case 'CheckedModeArray':
        return mode.checked.includes(mode.value) ? 'solid' : 'outline';
    }
  }

  ngAfterViewInit(): void {
    console.log(this.ionButtonEl)
    this.setIonButtonProps();
  }

  onToggle() {
    this.setChecked(!this.getChecked());
  }

  private getMode(): Mode {
    const checked = this.checkedInput;
    const value = this.valueInput;

    if (typeof(checked) === 'boolean') {
      return { tag: 'CheckedModeBoolean', checked }
    }

    if (Array.isArray(checked) && value !== undefined) {
      return { tag: 'CheckedModeArray', checked, value }
    }

    throw new Error(`'checked' or 'value' property is not valid`)
  }

  private getChecked(): boolean {
    const mode = this.getMode();
    switch (mode.tag) {
      case 'CheckedModeBoolean':
        return mode.checked;
      case 'CheckedModeArray':
        return mode.checked.includes(mode.value);
    }
  }

  private setChecked(val: boolean) {
    const mode = this.getMode();
    switch (mode.tag) {
      case 'CheckedModeBoolean': {
        if (mode.checked !== val) {
          const newChecked = val;
          this.checkedInput = newChecked;
          this.checkedChangeOutput.emit(newChecked);
        }
        break;
      }

      case 'CheckedModeArray': {
        if (this.getChecked() !== val) {
          if (val) {
            const newChecked = [...mode.checked, mode.value];
            this.checkedInput = newChecked;
            this.checkedChangeOutput.emit(newChecked);
          } else {
            const newChecked = mode.checked.filter(m => m !== mode.value);
            this.checkedInput = newChecked;
            this.checkedChangeOutput.emit(newChecked);
          }
        }
        break;
      }
    }
  }

  private setIonButtonProps() {
    const propsInput = this.ionButtonPropsInput

    if (propsInput) {
      Object.assign(this.ionButtonEl, propsInput)
    }
  }

}
