import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

/**
 * Service wich allow to pass data upon navigation. It CANNOT be used in template with routerLink,
 * and MUST be used programmaticaly in conjuction with the angular Router service.
 *
 * In the component which is navigating from:
 *   this.router.navigateByUrl('some/url').then(_ => this.routerData.emit({ <any key you like>: <any data you like> }))
 *
 * In the component which is navigating to:
 *    this.routerData.subscribe(data => { <do anything you like> })
 *
 * Under the hood, the emit() and subscribe() function of the RouterData service will check the integrity of the url passed to the navigation.
 * It will make sure to fire the callback if the url match the potential navigation redirections, without that the user must deal
 * with the integrity check and the DataSnapshot instance.
 */


// TODO: better interface which doesn't need signature assignement???
interface DataKeyString<T> { [key:string]: T }

interface DataSnapshot<T> {
  data: DataKeyString<T>,
  url: string
}


@Injectable({providedIn: 'root'})
export class RouterData {

  /**
   * The emit() and subscribe() functions below allow the user to ignore the integrity check and to use only his
   * desired data structure, without need to cope with the url property of the DataSnapshot.
   * If required, the data$ observable can alternatively be used for advance management...
  */
 private _data$ = new Subject()
 data$ = this._data$.asObservable();

  constructor(private router: Router) {}

  /**
   * Parameter of type DataKeyString (anything the user want to pass through!)
   * Emit a Datasnapshot event, which holds the "url" as integrity check.
   * The user won't have to deal with the Datasnaphot, but with the DataKeyString only!
   * In case of redirection, 'this.router.url' in the promise.then() of 'this.router.navigateToUrl()'
   * will return the redirected url.
   */
  emit<T>(data: DataKeyString<T>) {
    const redirectedUrl = this.router.url;
    this._data$.next({url: redirectedUrl, data})
  }

  /**
   * Subscribe rewritten, in order to use the "url" as integrity check, and fires callback only if needed (in the
   * effective requested url), since subscribtion in another page would be fired as well...
   * The user won't have to deal with the Datasnaphot, but with the DataKeyString only!
   */
  subscribe<T>(callbackFn: (data: DataKeyString<T>) => void) {
    return (this._data$ as Subject<DataSnapshot<T>>).subscribe(dataSnap => {
      // makes sure the callback is only fired in the right url!!
      if (dataSnap['url'] === this.router.url) {
        const {data} = dataSnap;
        callbackFn(data);
      }
    })
  }

}
