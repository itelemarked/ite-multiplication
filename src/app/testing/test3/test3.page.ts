import { Component } from "@angular/core";
import { TrainingService } from "./TrainingService";

@Component({
  selector: 'app-test3',
  styles: [``],
  template: `
    <h3>Test 3 Page works</h3>
  `
})
export class Test3Page {

  constructor(private trainingService: TrainingService) {



  }

}
