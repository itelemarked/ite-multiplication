import { Component, HostBinding, Input, OnInit } from '@angular/core';



function getIonicOrCssColor(val: string) {
  if (
    val === 'primary' ||
    val === 'secondary' ||
    val === 'tertiary' ||
    val === 'success' ||
    val === 'warning' ||
    val === 'danger' ||
    val === 'light' ||
    val === 'medium' ||
    val === 'dark'
  ) {
    return `var(--ion-color-${val})`;
  } else {
    return  val;
  }
}


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  @Input('color') 
  set colorInp(val: string) {
    this.colorCss = getIonicOrCssColor(val);
  }

  @Input('outerColor')
  set outerColorInp(val: string) {
    this.outerColorCss = getIonicOrCssColor(val);
  }

  @Input('value')
  set valueInp(val: number) {
    this.progressWidthCss = val.toString() + '%';
  }

  @HostBinding('style.--color') colorCss?: string;
  @HostBinding('style.--progress-width') progressWidthCss?: string;
  @HostBinding('style.--outer-color') outerColorCss?: string

}

