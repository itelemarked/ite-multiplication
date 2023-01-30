import { QueryList } from "@angular/core";

/**
* Adds properties passed as an literal object to predefined template references:
* e.g:
* 
* PARENT COMPONENT:
* <child-component [some-options]={size: 'small', color: 'danger}></child-component>
* 
* CHILD COMPONENT:
* @ViewChildren('someRef') someRefs!: QueryList<IonButton>;
* @Input('some-options') someOptions?: Partial<IonButton>;
* (...)
* ngAfterViewInit() {
*  addPropsToRefs(this.someOptions, this.someRefs)
* }
*/
export function addPropsToRefs<T>(props: Partial<T> | undefined, refs: QueryList<T>) {
 if (props === undefined) return;

 refs.forEach(ref => {
   const _ref = ref as {[key: string]: any};
   const _props = props as {[key: string]: any};
   for (let key in props) {
     _ref[key] = _props[key];
   }
 })
}