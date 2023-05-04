import { Input, Output, EventEmitter, ChangeDetectionStrategy, Component, OnInit } from "@angular/core";



export type CheckedInput = boolean | ValueInput[]
export type ValueInput = string | number | undefined;

type CheckedModeBoolean = { tag: 'boolean', checked: boolean }
type CheckedModeArray = { tag: 'array', checked: ValueInput[], value: ValueInput }
type CheckedMode = CheckedModeBoolean | CheckedModeArray;

const getMode = (checked: CheckedInput, value: ValueInput): CheckedMode => {
  if (typeof(checked) === 'boolean') {
    return { tag: 'boolean', checked }
  }

  return { tag: 'array', checked, value }
}

const isChecked = (mode: CheckedMode): boolean => {
  switch (mode.tag) {
    case 'boolean': {
      return mode.checked;
    }
    case 'array': {
      return mode.checked.includes(mode.value);
    }
  }
}

const setChecked = (mode: CheckedMode, val: boolean): CheckedMode => {
  switch (mode.tag) {
    case 'boolean': {
      return { tag: 'boolean', checked: !mode.checked };
    }
    case 'array': {
      const newChecked = val ? [...mode.checked, mode.value] : mode.checked.filter(m => m !== mode.value)
      return { tag: 'array', checked: newChecked, value: mode.value }
    }
  }
}


@Component({
  selector: 'app-toggle-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-button [fill]="fill" [color]="colorInput" (click)="onToggle()">
      <ng-content></ng-content>
    </ion-button>
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

    ion-button {
      width: 100%;
    }
  `]
})
export class ToggleButtonComponent implements OnInit {

  @Input('checked')
  checkedInput: CheckedInput = false;

  @Input('value')
  valueInput?: ValueInput;

  @Input('color')
  colorInput?: string;

  @Output('checkedChange')
  checkedChangeOutput = new EventEmitter<CheckedInput>();

  get fill(): 'solid' | 'outline' {
    return this.isChecked() ? 'solid' : 'outline';
  }

  ngOnInit(): void {
    const mode = this.getMode();
    if (mode.tag === 'array' && mode.value === undefined) {
      console.warn(`ToggleButtonComponent: The checked property is of type 'array', but no value property has been defined. Checked: ${mode.checked}, Value: ${mode.value}`)
    }
  }

  onToggle() {
    const newCheckedInput = this.setChecked(!this.isChecked);

    this.checkedInput = newCheckedInput;
    this.checkedChangeOutput.emit(newCheckedInput);
  }

  private getMode(): CheckedMode {
    return getMode(this.checkedInput, this.valueInput);
  }

  private isChecked(): boolean {
    return isChecked(this.getMode());
  }

  private setChecked(val: boolean): CheckedInput {
    return setChecked(this.getMode(), val).checked;
  }

}





