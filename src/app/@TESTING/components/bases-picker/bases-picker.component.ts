import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'app-bases-picker',
  templateUrl: './bases-picker.component.html',
  styleUrls: ['./bases-picker.component.scss']
})
export class BasesPickerComponent implements AfterViewInit {

  @ViewChildren(ToggleButtonComponent) toggleBtns!: QueryList<ToggleButtonComponent>;

  @HostListener('click') onClick() {
    this.updateBases();
  }

  @Input() bases: any[] = [];

  @Output() basesChange = new EventEmitter<any[]>();

  constructor() { }

  ngAfterViewInit(): void {
    console.log('BasesPickerComponent afterInit')
    this.renderBases();
  }

  updateBases() {
    this.bases = this.toggleBtns.filter(t => t.checked === true).map(t => t.value);
    this.basesChange.emit(this.bases);
  }

  renderBases() {
    // this.bases.forEach(base => {
    //   const foundBtn = this.toggleBtns.find(t => t.value === base)

    //   if (foundBtn) foundBtn.checked = true;
    //   console.log(foundBtn)
    // })
    this.toggleBtns.forEach(btn => {
      if (this.bases.includes(btn.value)) {
        btn.checked = true;
        btn.renderBtnColor();
      }
    })
  }

}
