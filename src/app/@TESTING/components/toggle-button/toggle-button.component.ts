import { AfterViewInit, Component, ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-toggle-button',
  template: `<ng-content></ng-content>`,
  styles: [``]
})
export class ToggleButtonComponent implements AfterViewInit {

  private _checkedColor = 'primary';
  private _uncheckedColor = 'light';

  @Input() value?: any;
  @Input() checked: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  @ContentChild(IonButton) btn!: IonButton;

  @HostListener('click') toggleChecked() {
    const newChecked = !this.checked;
    this.checked = newChecked;
    this.renderBtnColor();
    this.checkedChange.emit(newChecked);
  }

  ngAfterViewInit(): void {
    console.log('ToggleButtonComponent afterInit')
    if (this.btn === undefined) throw new Error('APP-TOGGLE-BUTTON Component: must have a  "ion-button" as child!!');
    if (this.btn.color) this._checkedColor = this.btn.color;
    this.renderBtnColor();
  }

  // renderBtnColor(checked: boolean, checkedColor: string, uncheckedColor: string) {
  //   this.btn.color = checked ? checkedColor: uncheckedColor;
  // }

  renderBtnColor() {
    this.btn.color = this.checked ? this._checkedColor: this._uncheckedColor;
  }

}
