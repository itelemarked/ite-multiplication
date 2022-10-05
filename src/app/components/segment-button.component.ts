import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IonButton } from '@ionic/angular';
import { addPropsToRefs } from '../models/Utils';

@Component({
  selector: 'app-segment-button',
  styles: [
    `
      :host {
        display: inline-block;
      }

      .btn {
        margin: 0;
        --border-width: 1px 0px 1px 1px;
      }

      .minus {
        --border-radius: 6px 0 0 6px;
        --border-width: 1px 0px 1px 1px;
      }

      .plus {
        --border-radius: 0 6px 6px 0;
        --border-width: 1px;
      }
    `,
  ],
  template: `
    <ion-button
      #ionButtonRef
      class="btn minus"
      fill="outline"
      (click)="onClick('-')"
      >-</ion-button
    >
    <ion-button
      #ionButtonRef
      class="btn plus"
      fill="outline"
      (click)="onClick('+')"
      >+</ion-button
    >
  `,
})
export class SegmentButtonComponent implements AfterViewInit {
  @ViewChildren('ionButtonRef') ionButtonRefs!: QueryList<IonButton>;

  @Input('ion-button-props') ionButtonProps?: Partial<IonButton>;

  @Input('value') inputValue?: number;

  @Input('min') inputMin?: number;

  @Input('max') inputMax?: number;

  @Output('valueChange') outputValueChange = new EventEmitter<number>();

  ngAfterViewInit(): void {
    addPropsToRefs<IonButton>(this.ionButtonProps, this.ionButtonRefs);
  }

  onClick(type: '+' | '-') {
    const maxIsUndefined = this.inputMax === undefined;
    const minIsUndefined = this.inputMin === undefined;
    const maxIsGreaterThanValue =
      this.inputMax !== undefined &&
      this.inputValue !== undefined &&
      this.inputMax > this.inputValue;
    const minIsSmallerThanValue =
      this.inputMin !== undefined &&
      this.inputValue !== undefined &&
      this.inputMin < this.inputValue;

    if (type === '+' && (maxIsUndefined || maxIsGreaterThanValue)) {
      this.outputValueChange.emit(this.inputValue! + 1);
      return;
    }

    if (type === '-' && (minIsUndefined || minIsSmallerThanValue)) {
      this.outputValueChange.emit(this.inputValue! - 1);
      return;
    }
  }
}

// <template>
//   <div class="ite-segment-button">
//     <ion-button class="btn minus" v-bind="$attrs" fill="outline" @click="onClick('-')">-</ion-button>
//     <ion-button class="btn plus" v-bind="$attrs" fill="outline" @click="onClick('+')">+</ion-button>
//   </div>
// </template>

// <script lang="ts">
//   export default {
//     inheritAttrs: false,
//   };
// </script>

// <script setup lang="ts">
//   import { IonButton } from '@ionic/vue';
//   import { computed } from 'vue';

//   const props = defineProps<{
//     modelValue?: number;
//     min?: number;
//     max?: number;
//   }>();

//   const emits = defineEmits([
//     'update:modelValue'
//   ])

//   function onClick(type: '+' | '-') {

//     if (props.modelValue === undefined) return;

//     const maxIsGreaterThanValue = props.max !== undefined && props.modelValue < props.max;
//     const maxIsUndefined = props.max === undefined;
//     const minIsSmallerThanValue = props.min !== undefined && props.modelValue > props.min;
//     const minIsUndefined = props.min === undefined;

//     if (type === '+' && (maxIsGreaterThanValue || maxIsUndefined)) {
//       emits('update:modelValue', props.modelValue + 1)
//     } else if (type === '-' && (minIsSmallerThanValue || minIsUndefined)) {
//       emits('update:modelValue', props.modelValue - 1)
//     }
//   }

//   // function animateClick(e: MouseEvent) {
//   //   const el = e.target as HTMLElement;
//   //   el.classList.add('activated');
//   //   setTimeout(() => {
//   //     el.classList.remove('activated');
//   //   }, 200);
//   // }
// </script>

// <style>
//   .ite-segment-button {
//     display: inline-block;
//   }

//   .btn {
//     margin: 0;
//     --border-width: 1px 0px 1px 1px;
//   }

//   .minus {
//     --border-radius: 6px 0 0 6px;
//     --border-width: 1px 0px 1px 1px;
//   }

//   .plus {
//     --border-radius: 0 6px 6px 0;
//     --border-width: 1px;
//   }
// </style>
