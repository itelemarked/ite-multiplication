import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Multiple } from "./Multiple";
import { NonNegativeInt } from "./NonNegativeInt";

@Injectable({providedIn: 'root'})
export class TrainingService {

  constructor(private fs: AngularFirestore) {}

  add(userId: string, successRequired: NonNegativeInt, multiples: Multiple[]): Promise<any> {
    return this.fs.collection('aaaa').add({test: 'aaaa'})
  }

  // setTraining(training: Training): Promise<void> {}

  // getTraining(trainingId: string): Promise<Training | null> {}

}
