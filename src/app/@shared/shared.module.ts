import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AppToolbarMenuModal } from "./components/app-toolbar/app-toolbar-menu.modal";
import { AppToolbarComponent } from "./components/app-toolbar/app-toolbar.component";



const COMPONENTS = [
  AppToolbarComponent,
  AppToolbarMenuModal
];


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
