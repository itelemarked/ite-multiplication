import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { cloneDeep, cloneDeepWith, forEach, forIn, mapValues, merge } from "lodash";


const KEYS = {
  'key-1': { caption: '1', transform: (val: string) => val + '1' },
  // 'key-1': { icon: 'close-circle-outline', transform: (val: string) => val + '1' },
  'key-2': { caption: '2', transform: (val: string) => val + '2' },
  'key-3': { caption: '3', transform: (val: string) => val + '3' },
  'key-4': { caption: '4', transform: (val: string) => val + '4' },
  'key-5': { caption: '5', transform: (val: string) => val + '5' },
  'key-6': { caption: '6', transform: (val: string) => val + '6' },
  'key-7': { caption: '7', transform: (val: string) => val + '7' },
  'key-8': { caption: '8', transform: (val: string) => val + '8' },
  'key-9': { caption: '9', transform: (val: string) => val + '9' },
  'key-0': { caption: '0', transform: (val: string) => val + '0' },
  'key-L': { caption: 'L', transform: (val: string) => val },
  'key-R': { caption: 'R', transform: (val: string) => val },
  'key-CNL': { icon: 'close-circle-outline', transform: (val: string) => '' },
  'key-OK': { caption: 'OK', transform: (val: string) => val },
}

type KeyTransform = (val: string) => string;
type KeyCaption = { caption: string, transform: KeyTransform }
type KeyIcon = { icon: string, transform: KeyTransform }
type Key = KeyCaption | KeyIcon;

type Keys = Record<keyof typeof KEYS, Key>

const isKeyIcon = (key: Key): key is KeyIcon => {
  return 'icon' in key;
}


// @Component({
//   selector: 'app-numeric-keyboard-key',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//     <!-- <div *ngIf="!key1.isIcon">1</div>
//     <ion-icon *ngIf="key1.isIcon" name="close-circle-outline"></ion-icon> -->
//   `,
//   styles: [``]
// })
// export class NumericKeyboardKeyComponent {
//   @Input('key')
//   keyInput!: Key;
// }


@Component({
  selector: 'app-numeric-keyboard2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p style="display: none;">updating: {{ logChangeCycle }}</p>
    <div class="grid">
      <div class="col">
        <!-- <div class="row key-num key-1" (click)="onKeyClick('key-1')">1</div> -->
        <div class="row key-num key-1" (click)="onKeyClick('key-1')">
          <!-- <div *ngIf="'caption' in keys['key-1']">{{ "'caption' in keys['key-1'] ? keys['key-1'].caption : ''" }}</div>
          <ion-icon *ngIf="'icon' in keys['key-1']" name="'icon' in keys['key-1'] ? keys['key-1'].icon : ''"></ion-icon> -->
          <div *ngIf="!keys['key-1'].isIcon">{{keys['key-1'].text}}</div>
          <ion-icon *ngIf="keys['key-1'].isIcon" [name]="keys['key-1'].text"></ion-icon>
          <!-- <app-numeric-keyboard-key [key]="keys['key-1']"></app-numeric-keyboard-key> -->
        </div>
        <div class="row key-num key-4" (click)="onKeyClick('key-4')">4</div>
        <div class="row key-num key-7" (click)="onKeyClick('key-7')">7</div>
        <div class="row key-L-R key-L" (click)="onKeyClick('key-L')"></div>
      </div>
      <div class="col">
        <div class="row key-num key-2" (click)="onKeyClick('key-2')">2</div>
        <div class="row key-num key-5" (click)="onKeyClick('key-5')">5</div>
        <div class="row key-num key-8" (click)="onKeyClick('key-8')">8</div>
        <div class="row key-num key-10" (click)="onKeyClick('key-10')">0</div>
      </div>
      <div class="col">
        <div class="row key-num key-3" (click)="onKeyClick('key-3')">3</div>
        <div class="row key-num key-6" (click)="onKeyClick('key-6')">6</div>
        <div class="row key-num key-9" (click)="onKeyClick('key-9')">9</div>
        <div class="row key-L-R key-R" (click)="onKeyClick('key-R')"></div>
      </div>
      <div class="col">
        <div class="row key-OK-CNL key-CNL" (click)="onKeyClick('key-CNL')">
          <div>CNL</div>
          <!-- <ion-icon name="close-circle-outline"></ion-icon> -->
        </div>
        <div class="row key-OK-CNL key-OK" (click)="onKeyClick('key-OK')">ok</div>
      </div>
    </div>

  `,
  styles: [`
    :host {
      --line-width: 0.5px;

      /** TODO: add ionic colors to global scss, and use them below */
      --key-num-background-color: white;
      --key-num-background-color-activated: lightgrey;
      --key-num-color: inherit;

      /** TODO: add ionic colors to global scss, and use them below */
      --key-L-background-color: yellow;
      --key-L-background-color-activated: lightgrey;
      --key-L-color: inherit;

      /** TODO: add ionic colors to global scss, and use them below */
      --key-R-background-color: yellow;
      --key-R-background-color-activated: lightgrey;
      --key-R-color: inherit;

      /** TODO: add ionic colors to global scss, and use them below */
      --key-CNL-background-color: lightgrey;
      --key-CNL-background-color-activated: grey;
      --key-CNL-color: inherit;

      --key-OK-background-color: var(--ion-color-primary, #3880ff);
      --key-OK-background-color-activated: var(--ion-color-primary-shade, #3171e0);
      --key-OK-color: var(--ion-color-primary-contrast, #fff);
    }

    :host {
      /* display: block; */
      position: absolute;
      width: 100%;
      height: 300px;
      bottom: 0;
    }

    ion-icon {
      font-size: 1.4em;
    }

    .grid {
      display: flex;
      height: 100%;
      width: 100%;
      background-color: #ededed;
      padding: var(--line-width);
      font-size: 1.5em;
    }

    .col {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      /* border: solid 1px cyan; */
      background-color: white;
      margin: var(--line-width);
      transition-delay: 0.1s;
    }

    .row:active {
      background-color: lightgrey;
      transition: 0s;
    }

    /** TODO */
    .key-num {
      background-color: var(--key-num-background-color);
      color: var(--key-num-color);
    }

    .key-num:active {
      background-color: var(--key-num-background-color-activated);
    }

    .key-L {
      background-color: var(--key-L-background-color);
      color: var(--key-L-color);
    }

    .key-L:active {
      background-color: var(--key-L-background-color-activated);
    }

    .key-R {
      background-color: var(--key-R-background-color);
      color: var(--key-R-color);
    }

    .key-R:active {
      background-color: var(--key-R-background-color-activated);
    }

    .key-CNL {
      background-color: var(--key-CNL-background-color);
      color: var(--key-CNL-color);
    }

    .key-CNL:active {
      background-color: var(--key-CNL-background-color-activated);
    }

    .key-OK {
      background-color: var(--key-OK-background-color);
      color: var(--key-OK-color);
    }

    .key-OK:active {
      background-color: var(--key-OK-background-color-activated);
    }
  `]
})
export class NumericKeyboardComponent2 implements OnInit {

  /**  DEV ONLY, TO DELETE. Logs to the console when a change cycle is fired! Due to 'onPush' strategy.
  * Change cycle is fired
  *   - when a template event is fired (in the template: (anyEvent)="...").
  *   - when an Input prop changes
  *   - others?? (async pipe, Observables, etc...)
  */
  get logChangeCycle() {
    console.log('change cycle fired!!')
    return true;
  }
  /** -------------- */

  @Input('value')
  valueInput: string = '';

  @Output('keyTapped')
  keyTappedOutput = new EventEmitter<string>();

  @Output('valueChange')
  valueChangeOutput = new EventEmitter<string>();

  keys!: Record<keyof typeof KEYS, {isIcon: boolean, text: string, transform: (val: string) => string }>;

  // constructor() {
  //   // console.log(
  //   //   mapValues(KEYS, (key: Key) => {
  //   //     const text = isKeyIcon(key) ? key['icon'] : key['caption']
  //   //     const isIcon = isKeyIcon(key) ? true : false;
  //   //     return {
  //   //       isIcon,
  //   //       text
  //   //     }
  //   //   })
  //   // )

  //   // console.log(cloneDeepWith(KEYS, (val: any, key: string|number|undefined, obj: any, stack: any) => {
  //   //   console.log(val)
  //   //   console.log(key)
  //   //   console.log(obj)
  //   //   console.log(stack)
  //   //   return {a: 1}
  //   // }))

  //   // console.log(
  //   //   forIn(KEYS, (value: any, key: any) => {
  //   //     console.log(`value: ${value}`)
  //   //     console.log(`key: ${key}`)
  //   //     return {a: 99}
  //   //   })
  //   // )
  // }

  ngOnInit() {
    const mapKeys = (key: Key) => {
      const text = isKeyIcon(key) ? key['icon'] : key['caption']
      const isIcon = isKeyIcon(key) ? true : false;
      const transform = key.transform;
      return { isIcon, text, transform }
    }

    this.keys = mapValues(KEYS, mapKeys)
    console.log(this.keys)
  }

  onKeyClick(keyName: string) {
    const key = this.keys[keyName as keyof typeof this.keys];
    const newValue = key.transform(this.valueInput)
    if (this.valueInput !== newValue) {
      this.valueInput = newValue;
      this.valueChangeOutput.emit(newValue);
    }

    this.keyTappedOutput.emit(keyName)
  }
}
