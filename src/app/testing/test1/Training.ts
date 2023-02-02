import { Observable, Subject } from "rxjs";
import { IMultiple, Multiple, TId } from "./Multiple";



export class Training {

  get multiples(): Multiple[] {
    // TODO: deep copy?
    return [...this._multiples];
  }
  private _multiples: Multiple[];

  /**
   * how many successes must happen to consider a multiple as completed.
   */
  get successesRequired(): number {
    return this._successesRequired;
  }
  public _successesRequired: number;

  /**
   * A complete event is fired as soon as a multiple has been changed and that the training can be marked as completed
   */
  private _complete$: Subject<void> = new Subject();
  public complete$: Observable<void> = this._complete$.asObservable();

  constructor(successesRequired: number, multiples: IMultiple[]) {
    this._successesRequired = successesRequired;
    this._multiples = multiples.map(m => new Multiple(m));
  }

  randomPendingMultiple(): Multiple {
    // Makes sure that at least one pending multiple exists!
    if (this._isTrainingCompleted()) throw new Error('Training is already completed... you should have been notified before....!!')

    const pendingMultiples = this.multiples.filter(m => m.successes < this.successesRequired!);
    const randomIdx = Math.floor((Math.random() * pendingMultiples.length))

    return pendingMultiples[randomIdx];
  }

  /**
   * Modifies the successes property of a multiple. Evaluate if 'complete' event should be fired.
   */
  addSuccess(multipleId: TId) {
    if (this._isTrainingCompleted()) throw new Error('Training is already completed... you should have been notified before....!!')

    const found = this._getMultipleById(multipleId);
    if (found === undefined) throw new Error(`No multiple matching id: ${multipleId}`)

    found.addSuccess();
    this._emitIfRequired();
  }

  /**
   * Modifies the fails property of a multiple. Evaluate if 'complete' event should be fired.
   */
  addFail(multipleId: TId) {
    if (this._isTrainingCompleted()) throw new Error('Training is already completed... you should have been notified before....!!')

    const found = this._getMultipleById(multipleId)
    if (found === undefined) throw new Error(`No multiple matching id: ${multipleId}`)

    found.addFail();
    this._emitIfRequired();
  }

  /**
   * Evaluates if all multiples are completed. Should be combined with the 'complete' event in the implementation.
   */
  _isTrainingCompleted() {
    const foundUncompleted = this._multiples.find(m => m.successes < this._successesRequired);
    return foundUncompleted === undefined;
  }

  /**
   * Evaluates if all multiples are completed. Emits 'complete' event if required.
   */
  private _emitIfRequired() {
    if (this._isTrainingCompleted()) {
      this._complete$.next();
    }
  }

  private _getMultipleById(multipleId: TId): Multiple | undefined {
    return this._multiples.find(m => m.id === multipleId);
  }

}
