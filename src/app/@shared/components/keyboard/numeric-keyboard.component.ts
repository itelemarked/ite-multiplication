import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import * as _ from "lodash";
import { BehaviorSubject, Observable, debounceTime, from, fromEvent, interval, map, switchMap, tap } from "rxjs";
// import * as _ from "lodash";


// const KEYS_DEFAULT = {
//   'key-1': { caption: '1', transform: (val: string) => val + '1' },
//   // 'key-1': { icon: 'close-circle-outline', transform: (val: string) => val + '1' },
//   'key-2': { caption: '2', transform: (val: string) => val + '2' },
//   'key-3': { caption: '3', transform: (val: string) => val + '3' },
//   'key-4': { caption: '4', transform: (val: string) => val + '4' },
//   'key-5': { caption: '5', transform: (val: string) => val + '5' },
//   'key-6': { caption: '6', transform: (val: string) => val + '6' },
//   'key-7': { caption: '7', transform: (val: string) => val + '7' },
//   'key-8': { caption: '8', transform: (val: string) => val + '8' },
//   'key-9': { caption: '9', transform: (val: string) => val + '9' },
//   'key-0': { caption: '0', transform: (val: string) => val + '0' },
//   'key-L': { caption: 'L', transform: (val: string) => val },
//   'key-R': { caption: 'R', transform: (val: string) => val },
//   'key-CNL': { icon: 'close-circle-outline', transform: (val: string) => '' },
//   'key-OK': { caption: 'OK', transform: (val: string) => val },
// }

const KEYS_DEFAULT = {
  'key-1': { isIcon: false ,caption: '1', transform: (val: string) => val + '1' },
  'key-2': { isIcon: false ,caption: '2', transform: (val: string) => val + '2' },
  'key-3': { isIcon: false ,caption: '3', transform: (val: string) => val + '3' },
  'key-4': { isIcon: false ,caption: '4', transform: (val: string) => val + '4' },
  'key-5': { isIcon: false ,caption: '5', transform: (val: string) => val + '5' },
  'key-6': { isIcon: false ,caption: '6', transform: (val: string) => val + '6' },
  'key-7': { isIcon: false ,caption: '7', transform: (val: string) => val + '7' },
  'key-8': { isIcon: false ,caption: '8', transform: (val: string) => val + '8' },
  'key-9': { isIcon: false ,caption: '9', transform: (val: string) => val + '9' },
  'key-0': { isIcon: false ,caption: '0', transform: (val: string) => val + '0' },
  'key-L': { isIcon: false ,caption: '', transform: (val: string) => val },
  'key-R': { isIcon: false ,caption: '', transform: (val: string) => val },
  'key-CNL': { isIcon: true, caption: 'close-circle-outline', transform: (val: string) => '' },
  'key-OK': { isIcon: false ,caption: 'OK', transform: (val: string) => val },
}


type KeyName =
| 'key-1'
| 'key-2'
| 'key-3'
| 'key-4'
| 'key-5'
| 'key-6'
| 'key-7'
| 'key-8'
| 'key-9'
| 'key-0'
| 'key-L'
| 'key-R'
| 'key-CNL'
| 'key-OK';

type KeyTransformFn = (val: string) => string


/** KEY */
type KeyOptionText = { text: string, transform?: KeyTransformFn }
type KeyOptionIcon = { icon: string, transform?: KeyTransformFn }
type KeyOptionTransform = { transform: KeyTransformFn }
type KeyOption =
| KeyOptionText
| KeyOptionIcon
| KeyOptionTransform

type KeyConfig = { isIcon: boolean, caption: string, transform: KeyTransformFn }

type KeyboardOptions = Partial<Record<KeyName, KeyOption>>
type Keyboard = Record<KeyName, KeyConfig>
type KeyboardConfigs = Partial<Keyboard>


const toKeyConfig = (keyOption: KeyOption, keyDefault: KeyConfig): KeyConfig => {
  if ('text' in keyOption) {
    const isIcon = false
    const caption = keyOption.text
    const transform = keyOption.transform || keyDefault.transform
    return { isIcon, caption, transform }
  }

  if ('icon' in keyOption) {
    const isIcon = true
    const caption = keyOption.icon
    const transform = keyOption.transform || keyDefault.transform
    return { isIcon, caption, transform }
  }

  const isIcon = false
  const caption = keyDefault.caption
  const transform = keyOption.transform
  return { isIcon, caption, transform }
}

const toKeyboardConfig = (keyboardDefault: Keyboard, keyboardOptions: KeyboardOptions | undefined): KeyboardConfigs | undefined => {
  if (keyboardOptions === undefined) return undefined;
  const map = (keyOption: KeyOption, keyName: KeyName) => toKeyConfig(keyOption, keyboardDefault[keyName])
  return _.mapValues(keyboardOptions, map);
}

const toKeyboard = (keyboardDefault: Keyboard, keyboardConfigs: KeyboardConfigs | undefined): Keyboard => {
  return _.merge({}, keyboardDefault, keyboardConfigs)
}



// DEV ONLY, TO DELETE
function test() {
  type Size = 'xs' | 'sm';

  const DEBOUNCE_TIME = 1000;

  const MIN_SIZE: Record<Size, number> = {
    'xs': 0,
    'sm': 400
  }

  const CLASSES = {
    'xs': 'app-size-xs',
    'sm': 'app-size-sm',
    'resizing': 'app-size-resizing'
  }

  function toSizes(): Size[] {
    const arr: Size[] = []
    if (window.innerWidth > MIN_SIZE.xs) arr.push('xs')
    if (window.innerWidth > MIN_SIZE.sm) arr.push('sm')
    return arr;
  }



  const subject$ = new BehaviorSubject<Size[]>(toSizes())

  const resize$: Observable<Size[]> = fromEvent(window, 'resize')
    .pipe(
      map(toSizes),
      // debounceTime(DEBOUNCE_TIME),
      // tap(console.log)
    )

  resize$.subscribe(subject$)

  // subject$.pipe(
  //   tap(sizes => {
  //     console.log('removeClasses(sizes)')
  //     console.log('addClass("resizing")')
  //   }),
  //   debounceTime(DEBOUNCE_TIME),
  //   tap(sizes => {
  //     console.log('-----------------')
  //     console.log('addClasses(sizes)')
  //     console.log('removeClass("resizing")')
  //     // element.removeClass('resizing')
  //     // element.addClass(sizes)
  //   })
  // )

  // subject$.pipe(
  //   map(val => val.map(v => v + ' px'))
  // )


  subject$.subscribe(console.log)


  // function updateResizeClasses$(element: any): Observable<any> {
  //   const resize$ = fromEvent(window, 'resize')
  //   // const subject$ = new BehaviorSubject<string>('aaa');
  //   return resize$.pipe(
  //     map(getSizes),
  //     map(e => 'abcd'),
  //     tap(sizes => {
  //       console.log('removeClasses(sizes)')
  //       console.log('addClass("resizing")')
  //       // element.removeClasses(sizes)
  //       // element.addClass('resizing')
  //     }),
  //     debounceTime(DEBOUNCE_TIME),
  //     tap(sizes => {
  //       console.log('-----------------')
  //       console.log('addClasses(sizes)')
  //       console.log('removeClass("resizing")')
  //       // element.removeClass('resizing')
  //       // element.addClass(sizes)
  //     })
  //   )
  //   // resize$.subscribe(val => subject$.next(val));
  //   // return subject$.asObservable()
  //   // return resize$;
  // }

  // updateResizeClasses$(111).subscribe()
}



@Component({
  selector: 'app-numeric-keyboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <p style="display: none;">updating: {{ logChangeCycle }}</p> -->
    <p>updating: {{ logChangeCycle }}</p>
    <div class="grid">
      <div class="col">
        <!-- <app-numeric-keyboard-key [key]="keys['key-1']"></app-numeric-keyboard-key> -->
        <div class="row key-num key-1" (click)="onKeyClick('key-1')">
          <div *ngIf="!keys['key-1'].isIcon">{{keys['key-1'].caption}}</div>
          <ion-icon *ngIf="keys['key-1'].isIcon" [name]="keys['key-1'].caption"></ion-icon>
        </div>
        <div class="row key-num key-4" (click)="onKeyClick('key-4')">
          <div *ngIf="!keys['key-4'].isIcon">{{keys['key-4'].caption}}</div>
          <ion-icon *ngIf="keys['key-4'].isIcon" [name]="keys['key-4'].caption"></ion-icon>
        </div>
        <div class="row key-num key-7" (click)="onKeyClick('key-7')">
          <div *ngIf="!keys['key-7'].isIcon">{{keys['key-7'].caption}}</div>
          <ion-icon *ngIf="keys['key-7'].isIcon" [name]="keys['key-7'].caption"></ion-icon>
        </div>
        <div class="row key-L-R key-L" (click)="onKeyClick('key-L')">
          <div *ngIf="!keys['key-L'].isIcon">{{keys['key-L'].caption}}</div>
          <ion-icon *ngIf="keys['key-L'].isIcon" [name]="keys['key-L'].caption"></ion-icon>
        </div>
      </div>
      <div class="col">
        <div class="row key-num key-2" (click)="onKeyClick('key-2')">
          <div *ngIf="!keys['key-2'].isIcon">{{keys['key-2'].caption}}</div>
          <ion-icon *ngIf="keys['key-2'].isIcon" [name]="keys['key-2'].caption"></ion-icon>
        </div>
        <div class="row key-num key-5" (click)="onKeyClick('key-5')">
          <div *ngIf="!keys['key-5'].isIcon">{{keys['key-5'].caption}}</div>
          <ion-icon *ngIf="keys['key-5'].isIcon" [name]="keys['key-5'].caption"></ion-icon>
        </div>
        <div class="row key-num key-8" (click)="onKeyClick('key-8')">
          <div *ngIf="!keys['key-8'].isIcon">{{keys['key-8'].caption}}</div>
          <ion-icon *ngIf="keys['key-8'].isIcon" [name]="keys['key-8'].caption"></ion-icon>
        </div>
        <div class="row key-num key-0" (click)="onKeyClick('key-0')">
          <div *ngIf="!keys['key-0'].isIcon">{{keys['key-0'].caption}}</div>
          <ion-icon *ngIf="keys['key-0'].isIcon" [name]="keys['key-0'].caption"></ion-icon>
        </div>
      </div>
      <div class="col">
        <div class="row key-num key-3" (click)="onKeyClick('key-3')">
          <div *ngIf="!keys['key-3'].isIcon">{{keys['key-3'].caption}}</div>
          <ion-icon *ngIf="keys['key-3'].isIcon" [name]="keys['key-3'].caption"></ion-icon>
        </div>
        <div class="row key-num key-6" (click)="onKeyClick('key-6')">
          <div *ngIf="!keys['key-6'].isIcon">{{keys['key-6'].caption}}</div>
          <ion-icon *ngIf="keys['key-6'].isIcon" [name]="keys['key-6'].caption"></ion-icon>
        </div>
        <div class="row key-num key-9" (click)="onKeyClick('key-9')">
          <div *ngIf="!keys['key-9'].isIcon">{{keys['key-9'].caption}}</div>
          <ion-icon *ngIf="keys['key-9'].isIcon" [name]="keys['key-9'].caption"></ion-icon>
        </div>
        <div class="row key-L-R key-R" (click)="onKeyClick('key-R')">
          <div *ngIf="!keys['key-R'].isIcon">{{keys['key-R'].caption}}</div>
          <ion-icon *ngIf="keys['key-R'].isIcon" [name]="keys['key-R'].caption"></ion-icon>
        </div>
      </div>
      <div class="col">
        <div class="row key-OK-CNL key-CNL" (click)="onKeyClick('key-CNL')">
          <div *ngIf="!keys['key-CNL'].isIcon">{{keys['key-CNL'].caption}}</div>
          <ion-icon *ngIf="keys['key-CNL'].isIcon" [name]="keys['key-CNL'].caption"></ion-icon>
        </div>
        <div class="row key-OK-CNL key-OK" (click)="onKeyClick('key-OK')">
          <div *ngIf="!keys['key-OK'].isIcon">{{keys['key-OK'].caption}}</div>
          <ion-icon *ngIf="keys['key-OK'].isIcon" [name]="keys['key-OK'].caption"></ion-icon>
        </div>
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
class NumericKeyboardComponent implements OnInit {

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

  /** DEV ONLY, TO DELETE */
  sizeClass = 'size-sm'

  @Input('value')
  valueInput: string = '';

  @Input('options')
  keyboardConfigOptionsInput?: KeyboardOptions;

  @Output('keyTapped')
  keyTappedOutput = new EventEmitter<string>();

  @Output('valueChange')
  valueChangeOutput = new EventEmitter<string>();

  keys!: Keyboard;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const config = toKeyboardConfig(KEYS_DEFAULT, this.keyboardConfigOptionsInput);
    this.keys = toKeyboard(KEYS_DEFAULT, config);

    // DEV ONLY, TO DELETE
    test()
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

export { KeyConfig, NumericKeyboardComponent }
