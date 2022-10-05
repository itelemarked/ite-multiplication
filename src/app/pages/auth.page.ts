import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/Auth/auth.service';

@Component({
  selector: 'app-auth-page',
  styles: [`
    .auth-setup {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 20% auto;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Auth </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      
      <app-auth-setup class="auth-setup"></app-auth-setup>

    </ion-content>
  `,
})
export class AuthPage implements OnInit {
  user$ = this.authService.user$;

  isChecked: boolean | (string | number)[] = false;
  segmentButtonValue: number = 2;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onCheckedChange(newChecked: boolean | (string | number)[]) {
    this.isChecked = newChecked;
  }
}
