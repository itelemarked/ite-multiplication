import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";


@Component({
  selector: 'app-bases-select',
  template: `
    <label>
      1<input #cb1 type="checkbox" value="1" [checked]="basesIncludes(1)" (change)="emitBases([cb1, cb2, cb3, cb4, cb5])">
    </label>

    <label>
      2<input #cb2 type="checkbox" value="2" [checked]="basesIncludes(2)" (change)="emitBases([cb1, cb2, cb3, cb4, cb5])">
    </label>

    <label>
      3<input #cb3 type="checkbox" value="3" [checked]="basesIncludes(3)" (change)="emitBases([cb1, cb2, cb3, cb4, cb5])">
    </label>

    <label>
      4<input #cb4 type="checkbox" value="4" [checked]="basesIncludes(4)" (change)="emitBases([cb1, cb2, cb3, cb4, cb5])">
    </label>

    <label>
      5<input #cb5 type="checkbox" value="5" [checked]="basesIncludes(5)" (change)="emitBases([cb1, cb2, cb3, cb4, cb5])">
    </label>
  `,
  styles: [``]
})
export class BasesSelectComponent {

  @Input() bases: number[] = [];
  @Output() basesChange = new EventEmitter<number[]>()

  emitBases(cbs: HTMLInputElement[]) {
    const newBases = cbs.filter(c => c.checked).map(c => +c.value);
    this.basesChange.emit(newBases);
  }

  basesIncludes(nb: number) {
    return this.bases.includes(nb);
  }

}
