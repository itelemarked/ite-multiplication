import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AppToolbarMenuModal } from "./components/app-toolbar/app-toolbar-menu.modal";
import { AppToolbarComponent } from "./components/app-toolbar/app-toolbar.component";


@NgModule({
  declarations: [
    AppToolbarComponent,
    AppToolbarMenuModal
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    AppToolbarComponent,
    AppToolbarMenuModal
  ]
})
export class SharedModule {}
