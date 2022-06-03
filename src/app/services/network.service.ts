import { Injectable } from "@angular/core";
import { merge, of, fromEvent, map, Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class NetworkService {

  onLine$$: Observable<boolean>;
  
  constructor() {
    this.onLine$$= merge(of(null), fromEvent(window, 'online'), fromEvent(window, 'offline')).pipe(
      map(_ => navigator.onLine)
    )
  }

}