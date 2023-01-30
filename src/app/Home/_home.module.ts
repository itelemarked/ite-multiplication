import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

import { HomePage } from "./home.page";



const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: defaultRoute },
  { path: '', component: HomePage },
  // { path: '**', pathMatch: 'full', redirectTo: defaultRoute },
];


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class HomeModule { }
