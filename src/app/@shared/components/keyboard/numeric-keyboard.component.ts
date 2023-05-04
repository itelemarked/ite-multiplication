import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-numeric-keyboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <ion-grid>
      <ion-row>
        <ion-col>11</ion-col>
        <ion-col>12</ion-col>
        <ion-col>13</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>21</ion-col>
        <ion-col>22</ion-col>
        <ion-col>23</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>31</ion-col>
        <ion-col>32</ion-col>
        <ion-col>33</ion-col>
      </ion-row>
      <ion-row>
        <ion-col>41</ion-col>
        <ion-col>42</ion-col>
        <ion-col>43</ion-col>
      </ion-row>
    </ion-grid> -->

    <div class="grid">
      <div class="col">
        <div class="row key-1">1</div>
        <div class="row key-4">4</div>
        <div class="row key-7">7</div>
        <div class="row key-10"></div>
      </div>
      <div class="col">
        <div class="row key-2">2</div>
        <div class="row key-5">5</div>
        <div class="row key-8">8</div>
        <div class="row key-11">0</div>
      </div>
      <div class="col">
        <div class="row key-3">3</div>
        <div class="row key-6">6</div>
        <div class="row key-9">9</div>
        <div class="row key-12"></div>
      </div>
      <div class="col">
        <div class="row key-13">X</div>
        <div class="row key-14">ok</div>
      </div>
    </div>

  `,
  styles: [`
    :host {
      --line-width: 0.5px;

      /** TODO: add ionic colors to global scss, and use them below */
      --key-13-background-color: lightgrey;
      --key-13-background-color-activated: grey;
      --key-13-color: inherit;

      --key-14-background-color: #3880ff;
      --key-14-background-color-activated: #3171e0;
      --key-14-color: #fff;
    }

    :host {
      display: block;
    }

    /* ion-grid {
      height: 100%;
      background-color: lightgrey;
      padding: 0.5px;
    }
    ion-row {

    }
    ion-col {
      background-color: white;
      margin: 0.5px;
    } */

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
    }

    .row:active {
      background-color: lightgrey;
    }

    /** TODO */
    .key-13 {
      background-color: var(--key-13-background-color);
      color: var(--key-13-color);
    }

    .key-13:active {
      background-color: var(--key-13-background-color-activated);
    }

    .key-14 {
      background-color: var(--key-14-background-color);
      color: var(--key-14-color);
    }

    .key-14:active {
      background-color: var(--key-14-background-color-activated);
    }
  `]
})
export class NumericKeyboardComponent {

}
