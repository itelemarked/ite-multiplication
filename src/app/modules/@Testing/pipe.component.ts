import { computeDecimalDigest } from "@angular/compiler/src/i18n/digest";
import { Component, Pipe, PipeTransform } from "@angular/core";



@Pipe({name: 'computed'})
export class ComputedPipe implements PipeTransform {
  transform(value: any): any {
    console.log('pipe called')
    return value;
  }
}

function computed(listenValues: any[], computeFn: () => any): {listenValues: any[], computeFn: () => any} {
  return {
    listenValues,
    computeFn
  }
}


@Component({
  selector: 'app-pipe',
  styles: [``],
  template: `
    <ion-button size="small" (click)="onBtnClick()">btn</ion-button>
    <p>counter1: {{ counter1 }}<p>
    <p>counter2: {{ counter2 }}<p>
    <p>counter: {{ counter }}<p>
  `
})
export class PipeComponent {

  counter1 = 5;
  counter2 = 6;

  counter = this._counter(this.counter1, this.counter2);

  onBtnClick() {
    const counter1 = this.counter1 + 1;
    const counter2 = this.counter2;

    this.counter1 = counter1
    this.counter = this._counter(counter1, counter2);
  }

  private _counter(counter1: number, counter2: number) {
    return counter1 + counter2
  }

}