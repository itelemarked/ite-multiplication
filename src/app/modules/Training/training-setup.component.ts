import { Component, OnDestroy, OnInit } from '@angular/core';
import { Multiple } from './Mutliple';
import { Training } from './Training';
import { TrainingStoreService } from './training-store.service';
// import SegmentButton from '@/app/components/SegmentButton.vue';
// import ToggleButton from '../../components/ToggleButton.vue';

@Component({
  selector: 'app-training-setup',
  styles: [
    `
      .inputs-text-disabled {
        color: lightgrey;
      }

      .grow-and-shrink {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        width: 0;
      }

      .width-100 {
        width: 100%;
      }

      .small-italic {
        font-size: 0.8em;
        font-style: italic;
        color: rgb(41, 41, 41);
      }

      .span-width {
        display: inline-block;
        width: 180px;
      }

      .padding-right {
        padding-right: 1em;
      }
    `,
  ],
  template: `
    <div
      class="inputs"
      [ngClass]="{ 'inputs-text-disabled': trainingInProgress }"
    >
      <div class="ite-flex ite-align-items-center">
        <span class="ite-grow-1">Time Interval:</span>
        <span class="padding-right">{{ timeInterval }} sec</span>
        <app-segment-button
          [disabled]="trainingInProgress"
          [color]="trainingInProgress ? 'medium' : 'primary'"
          [(value)]="timeInterval"
          [min]="2"
        ></app-segment-button>
      </div>

      <div class="ite-flex ite-align-items-center ion-padding-top">
        <span class="ite-grow-1">Successes required:</span>
        <span class="padding-right">{{ requiredSuccesses }}</span>
        <app-segment-button
          [disabled]="trainingInProgress"
          [color]="trainingInProgress ? 'medium' : 'primary'"
          [(value)]="requiredSuccesses"
          [min]="1"
          [max]="5"
        ></app-segment-button>
      </div>

      <div class="ite-flex ite-align-items-center ion-padding-top">
        <span class="ite-grow-1">Select bases:</span>
        <span>
          <ion-button
            [ngClass]="{
              'button-disabled ion-color ion-color-medium': trainingInProgress
            }"
            [disabled]="trainingInProgress"
            [color]="trainingInProgress ? 'medium' : 'primary'"
            size="small"
            fill="outline"
            style="width: 50px"
            (click)="onBasesChange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])"
            >All
          </ion-button>
          <ion-button
            [disabled]="trainingInProgress"
            [color]="trainingInProgress ? 'medium' : 'primary'"
            size="small"
            fill="outline"
            style="width: 50px"
            (click)="onBasesChange([])"
            >None</ion-button
          >
        </span>
      </div>

      <div>
        <ion-row>
          <ion-col size="12" size-sm="6" class="ion-no-padding">
            <div class="ite-flex">
              <app-toggle-button
                *ngFor="let n of [1, 2, 3, 4, 5, 6]"
                class="grow-and-shrink"
                [disabled]="trainingInProgress"
                [color]="trainingInProgress ? 'medium' : 'primary'"
                [checked]="selectedBases"
                (checkedChange)="onBasesChange($event)"
                [value]="n"
                >{{ n }}</app-toggle-button
              >
            </div>
          </ion-col>

          <ion-col size="12" size-sm="6" class="ion-no-padding">
            <div class="ite-flex">
              <app-toggle-button
                *ngFor="let n of [7, 8, 9, 10, 11, 12]"
                class="grow-and-shrink"
                [disabled]="trainingInProgress"
                [color]="trainingInProgress ? 'medium' : 'primary'"
                [checked]="selectedBases"
                (checkedChange)="onBasesChange($event)"
                [value]="n"
                >{{ n }}</app-toggle-button
              >
            </div>
          </ion-col>
        </ion-row>
      </div>

      <div class="ion-padding-top">
        <ion-button
          fill="outline"
          class="width-100"
          [disabled]="mainButtonDisabled"
          (click)="onMainButtonClick()"
          >{{ mainButtonText }}</ion-button
        >
      </div>

      <div class="small-italic">
        <p class="tab">
          <span class="span-width">{{ descriptionSuccessesRequiredText }}</span
          ><span>{{ descriptionSuccessesRequiredValue }}</span
          ><br />
          <span class="span-width">{{ descriptionEstimatedTimeText }}</span
          ><span>{{ descriptionEstimatedTimeValue }}</span>
        </p>
      </div>
    </div>

    <ion-button
      color="warning"
      (click)="onTrainingInProgressButtonClick(!trainingInProgress)"
      >toggle</ion-button
    >
    <div></div>
  `
})
export class TrainingSetupComponent implements OnInit {

  requiredSuccesses: number = 3;
  timeInterval: number = 2;
  selectedBases: boolean | (string | number)[] = [1, 3, 4];
  
  currentTraining!: Training;
  
  trainingInProgress!: boolean;
  mainButtonDisabled!: boolean;
  mainButtonText!: string;
  descriptionSuccessesRequiredText!: string;
  descriptionSuccessesRequiredValue!: number;
  descriptionEstimatedTimeText!: string;
  descriptionEstimatedTimeValue!: number;

  readonly FACTORS = [1,2,3,4,5,6,7,8,9,10,11,12];
  readonly ANIMATION_TIME = 1;

  constructor(private trainingStore: TrainingStoreService) {
    // trainingStore.storedTraining$.subscribe(this.onStoredTrainingChange.bind(this));
    // console.log(this._getMultiplesByBases(this.FACTORS, [5,6,7]).map(m => m.id))
    this._getMultiplesByBases(this.FACTORS, [5,6,7])
  }

  ngOnInit(): void {
    this.trainingStore.fetch().then(fetchedTraining => {
      if (!!fetchedTraining) {
        this.currentTraining = fetchedTraining
        this.requiredSuccesses = fetchedTraining.successNb;
        this.timeInterval = fetchedTraining.timeInterval;
        // this.selectedBases = 
        
      }
    })
    this.mainButtonText = this._getMainButtonText(this.trainingInProgress);
    this.mainButtonDisabled = this._getMainButtonDisabled(this.trainingInProgress, this.selectedBases);
  }

  onBasesChange(newBases: boolean | (string | number)[]) {
    this.selectedBases = newBases;
    this.mainButtonDisabled = this._getMainButtonDisabled(this.trainingInProgress, this.selectedBases);
  }

  onTrainingInProgressButtonClick(newTrainingInProgress: boolean) {
    this.trainingInProgress = newTrainingInProgress;
    this.mainButtonText = this._getMainButtonText(this.trainingInProgress);
    this.mainButtonDisabled = this._getMainButtonDisabled(this.trainingInProgress, this.selectedBases);
  }

  onStoredTrainingChange(newStoredTraining: Training | null | undefined) {
    const currentTraining = this._getTraining(newStoredTraining, this.requiredSuccesses, this.timeInterval, this.selectedBases as number[], this.FACTORS);
    if (!!newStoredTraining) {
      this.trainingInProgress = true;
      this.timeInterval = newStoredTraining.timeInterval;
      this.requiredSuccesses = newStoredTraining.successNb;
      // (...)
    } else {
      this.trainingInProgress = false;
      // (...)
    }
  }

  onMainButtonClick() {}



  private _getMainButtonDisabled(trainingInProgress: boolean, selectedBases: boolean | (string | number)[]): boolean {
    if (trainingInProgress) {
      return false;
    } else {
      return (selectedBases as number[]).length === 0;
    }
  }

  private _getMainButtonText(trainingInProgress: boolean): string {
    return trainingInProgress ? 'Resume' : 'Start';
  }

  private _getDescriptionSuccessesRequiredText(trainingInProgress: boolean): string {
    return trainingInProgress ? 'Remaining successes:' : 'Total successes required:';
  }

  // private _getDescriptionSuccessesRequiredValue(): number {
  //   if (trainingInProgress) {
  //     getRemainingSuccessesCount(uncompletedMultiplesCount, requiredSuccesses);
  //   } else {
  //     getTotalTrainingSuccessesCount(factors, bases, requiredSuccesses);
  //   }
  // }

  private _getDescriptionEstimatedTimeText(trainingInProgress: boolean): string {
    return trainingInProgress ? 'Remaining time:' : 'Total time required:';
  }

  // private _getDescriptionEstimatedTimeValue(): number {
  //   if (trainingInProgress) {
  //     const remainingTime = getRemainingTimeInSeconds(uncompletedMultiplesCount, requiredSuccesses, timeInterval, animationTime);
  //     return formatTimeMinSec(remainingTime);
  //   } else {
  //     const totalTrainingTime = getTotalTrainingTime(factors, bases, requiredSuccesses, timeInterval, animationTime);
  //     return formatTimeMinSec(totalTrainingTime);
  //   }
  // }


  // private _getTraining(storedTraining: Training | null | undefined, requiredSuccesses: number, timeInterval: number, selectedBases: number[], factors: number[]) {
  //   const getMultiplesByBases = this._getMultiplesByBases.bind(this);
    
  //   if (!!storedTraining) {
  //     return storedTraining;
  //   } else {
  //     const multiples = getMultiplesByBases(factors, selectedBases);
  //     return new Training(requiredSuccesses, timeInterval, multiples)
  //   }   
  // }

  private  _getMultiplesByBases(factors: number[], bases: number[]): Multiple[] {
    const getNoDuplicatesAscending = this._getNoDuplicatesAscending.bind(this)

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

  private _getNoDuplicatesAscending(arr: number[]): number[] {
    const uniques: number[] = [];
    arr.forEach((a) => {
      if (!uniques.includes(a)) uniques.push(a);
    });
    return uniques.sort((a,b)=> a-b);
  }


}



