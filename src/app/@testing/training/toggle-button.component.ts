import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";


/**
 * PROPS:
 *  - checked: boolean | (string | number)[]. Optional. Default: false. Responsive
 *  - disabled: boolean. Optional. Default: false. Responsive
 *  - ionButtonOptions: a object of ionButtons key-value pairs. Optional. Default: undefined.
 *    Note that the 'fill' property cannot / shouldn't be used since it is needed for the _isChecked property rendering.
 */



type Checked = boolean | (string|number)[];


@Component({
  selector: 'app-toggle-button',
  template: `
    <ion-button [fill]="ionButtonFill" (click)="onToggle()">
      <ng-content></ng-content>
    </ion-button>
  `,
  styles: [`

  `]
})
export class ToggleButtonComponent implements OnInit, OnChanges {

  private _checked: Checked = false;
  private _value?: string | number;

  // @Input('checked')
  // set checkedInput(val: Checked) {
  //   this.onCheckedInputChange(val);
  // }

  @Input('checked') checkedInput?: Checked;

  @Input('value') valueInput?: string | number;

  @Output('checkedChange') checkedChangeOutput = new EventEmitter<Checked>();

  get ionButtonFill(): 'solid' | 'outline' {
    return this._checked ? 'solid' : 'outline';
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  setChecked(val: Checked) {
    this._checked = val;
    this.checkedChangeOutput.emit(val);
  }

  onToggle() {
    if (Array.isArray(this._checked)) {

    } else {
      this.setChecked(!this._checked)
    }
  }

  onCheckedInputChange(val: Checked) {
    this.setChecked(val);
  }

}
