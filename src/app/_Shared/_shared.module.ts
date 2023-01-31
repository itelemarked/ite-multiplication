import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AppToolbarComponent, AppToolbarMenuModal } from "./components/app-toolbar";

const COMPONENTS = [
  AppToolbarComponent,
  AppToolbarMenuModal
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: COMPONENTS
})
export class SharedModule {}
