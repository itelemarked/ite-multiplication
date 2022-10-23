import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Multiple } from './Multiple';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-storing',
  styles: [],
  template: `
    <p>
      <ion-text [color]="inProgress ? 'medium' : undefined">
        Time interval:
        <input
          type="text"
          [disabled]="inProgress"
          [ngModel]="timeInterval"
          (ngModelChange)="onTimeIntervalChange($event)"
          [ngModelOptions]="{ updateOn: 'blur' }"
        />
      </ion-text>
    </p>

    <p>
      <ion-text  [color]="inProgress ? 'medium' : undefined">
        Successes required:
        <input
          type="text"
          [disabled]="inProgress"
          [ngModel]="requiredSuccesses"
          (ngModelChange)="onReqSuccessesChange($event)"
          [ngModelOptions]="{ updateOn: 'blur' }"
        />
      </ion-text>
    </p>

    <p>
      <ion-text  [color]="inProgress ? 'medium' : undefined">
        Bases:
        <input
          type="text"
          [disabled]="inProgress"
          [ngModel]="bases.join(',')"
          (ngModelChange)="onBasesChange($event)"
          [ngModelOptions]="{ updateOn: 'blur' }"
        />
      </ion-text>
    </p>

    <ion-button [color]="inProgress ? 'medium' : 'primary'" [disabled]="inProgress" (click)="onStart()">START</ion-button>

    <div *ngIf="inProgress">
      {{ currentMultipleRandomTitle }}
      <input type="text" (blur)="onValidate($event)"/>
    </div>
  `,
})
export class StoringComponent {
  private FACTORS = [1,2,3];
  private subscriptions: Subscription[] = [];

  timeInterval!: number;
  requiredSuccesses!: number;
  bases!: number[];

  inProgress!: boolean;

  multiples!: Multiple[] | null;
  currentMultiple!: Multiple | null;
  currentMultipleRandomTitle!: string | null;

  constructor(private training: TrainingService) {
    console.log('Storingcomponent constructor')
  }

  ngOnInit() {
    this.inProgress = false;
    // this.timeInterval = 2;
    this.requiredSuccesses = 1;
    this.bases = [1];
    this.multiples = null;
    this.currentMultiple = null;
    this.currentMultipleRandomTitle = null;

    // this.subscribe<number>(this.training.timeInterval$, this.timeInterval);
    this.subscriptions = [
      this.training.timeInterval$.subscribe(res => this.timeInterval = res)
      // this.training.multiples$.subscribe(res => !!res)
    ]

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onTimeIntervalChange(newVal: string) {
    console.log(+newVal)
    this.training.setTimeInterval(+newVal);
  }

  onReqSuccessesChange(newVal: number) {
    this.requiredSuccesses = newVal;
  }

  onBasesChange(newVal: string) {
    this.bases = newVal.split(',').map(a => +a);
  }

  onStart() {
    this.inProgress = true;
    this.multiples = this._getMultiplesByBases(this.FACTORS, this.bases);
    this.currentMultiple = this._getRandomUncompletedMultiple(this.multiples, this.requiredSuccesses);
    this.currentMultipleRandomTitle = this.currentMultiple!.getTitle(true);
  }

  onValidate(e: any) {
    const newVal: number = +e.target.value;
    // handle successes or fails.
    if (this.currentMultiple!.result === newVal) {
      this.currentMultiple!.addSuccess();
      console.log('success!')
    } else {
      this.currentMultiple!.addFail();
      console.log('fail!')
    }
    e.target.value = '';
    this.currentMultiple = this._getRandomUncompletedMultiple(this.multiples!, this.requiredSuccesses);
    if(this.currentMultiple === null) {
      this.currentMultipleRandomTitle = null;
      this.onComplete()
    } else {
      this.currentMultipleRandomTitle = this.currentMultiple?.getTitle(true);
    }
  }

  onComplete() {
    console.log('completed')
  }


  /** UTILS */

  // private subscribe<T>(observable: Observable<T>, prop: T) {
  //   this.subscriptions.push(observable.subscribe((res: T) => prop = res))
  // }

  private  _getMultiplesByBases(factors: number[], bases: number[]): Multiple[] {
    const getNoDuplicatesAscending = (arr: number[]): number[] => {
      const uniques: number[] = [];
      arr.forEach((a) => {
        if (!uniques.includes(a)) uniques.push(a);
      });
      return uniques.sort((a,b)=> a-b);
    }

    const sortedBases = getNoDuplicatesAscending(bases);
    const sortedFactors = getNoDuplicatesAscending(factors);
    const multiples: Multiple[] = [];

    let b: number;
    let f: number;
    for (let i = 0; i < sortedBases.length; i++) {
      b = sortedBases[i];
      for (let j = 0; j < factors.length; j++) {
        f = sortedFactors[j];
        if (!(sortedBases.includes(f) && f < b)) {
          multiples.push(new Multiple(f, b));
        }
      }
    }
    return multiples;
  }

  private _getRandomUncompletedMultiple(multiples: Multiple[], requiredSuccesses: number): Multiple | null {
    const uncompletedMultiples = multiples.filter(m => m.successes < requiredSuccesses);
    if (uncompletedMultiples.length === 0) return null;

    const getRandomIntegerBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

    const randomIndex = getRandomIntegerBetween(0, uncompletedMultiples.length - 1);
    return uncompletedMultiples[randomIndex];
  }

}
