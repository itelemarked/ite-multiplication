import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlStatus,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { IAuthError, IUser, TAuthStatus } from './auth.models';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-setup',
  styles: [
    `
      :host {
        display: inline-block;
      }

      .form-control.ion-touched.ion-invalid {
        color: red;
      }

      .form-control {
        --padding-start: 0;
      }

      .main-error-message {
        font-size: 0.9em;
        font-style: italic;
        background: rgba(255, 0, 0, 0.2);
        padding: 1em 1em;
        border-radius: 4px;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="!loading">
      <ng-container
        *ngIf="status === 'logout'; then logout; else loginOrSignup"
      ></ng-container>
    </ng-container>

    <ng-template #logout>
      <p>Logged in as: {{ user?.username }}</p>
      <div class="ion-padding-top">
        <ion-button color="danger" expand="block" (click)="onLogout()"
          >Logout</ion-button
        >
      </div>
    </ng-template>

    <ng-template #loginOrSignup>
      <form [formGroup]="form">
        <div
          *ngIf="mainErrorMessage.trim().length > 0"
          class="main-error-message"
        >
          {{ mainErrorMessage }}
        </div>

        <ion-item class="form-control">
          <ion-label position="stacked">
            <span>Username: </span>
            <span>{{ usernameCtlErrorMessage }}</span>
          </ion-label>
          <ion-input
            type="text"
            placeholder="Enter a username"
            formControlName="usernameCtl"
            (ionChange)="onCtlChangeOrBlur('usernameCtl')"
            (ionBlur)="onCtlChangeOrBlur('usernameCtl')"
          ></ion-input>
        </ion-item>

        <ion-item class="form-control">
          <ion-label position="stacked">
            <span>Password: </span>
            <span>{{ passwordCtlErrorMessage }}</span>
          </ion-label>
          <ion-input
            type="password"
            placeholder="Enter a password"
            formControlName="passwordCtl"
            (ionChange)="onCtlChangeOrBlur('passwordCtl')"
            (ionBlur)="onCtlChangeOrBlur('passwordCtl')"
          ></ion-input>
        </ion-item>

        <div class="ion-padding-top">
          <ion-button
            expand="block"
            fill="outline"
            [disabled]="mainButtonDisabled"
            (click)="onLoginOrSignup()"
            >{{ mainButtonTitle }}</ion-button
          >

          <p>
            {{ descriptionText }}
            <ion-text color="primary" (click)="onAlternativeClick()">{{
              descriptionAlternativeText
            }}</ion-text>
          </p>
        </div>
      </form>
    </ng-template>
  `,
})
export class AuthSetupComponent {
  loading: boolean = true;

  // TODO: validation to be improved... using validators? or using blur(or change) and focus (or change) events???
  form: FormGroup = this.fb.group({
    usernameCtl: ['', [Validators.required]],
    passwordCtl: ['', [Validators.required, Validators.minLength(6)]],
  });

  usernameCtlErrorMessage: string = this._getUsernameCtlErrorMessage(this.form);

  passwordCtlErrorMessage: string = this._getPasswordCtlErrorMessage(this.form);

  mainButtonDisabled: boolean = this._getMainButtonDisabled(this.form);

  user: IUser | null = null;

  status: TAuthStatus = this._getStatus(this.user);

  mainButtonTitle: string = this._getMainButtonTitle(this.status);

  descriptionText: string = this._getDescriptionText(this.status);

  descriptionAlternativeText: string = this._getDescriptionAlternativeText(this.status);

  mainErrorMessage: string = '';

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe((_user: IUser | null) => {
      this.loading = false;
    });
    this.auth.user$.subscribe(this.onUserChange.bind(this));
  }

  onUserChange(newUser: IUser | null) {
    this.user = newUser;
    this.status = this._getStatus(newUser);
  }

  onAlternativeClick() {
    let newStatus: TAuthStatus = 'login';
    if (this.status === 'login') newStatus = 'signup';
    this.status = newStatus;
    this.mainButtonTitle = this._getMainButtonTitle(newStatus);
    this.descriptionText = this._getDescriptionText(newStatus);
    this.descriptionAlternativeText =
      this._getDescriptionAlternativeText(newStatus);
  }

  onCtlChangeOrBlur(ctlName: string) {
    if (ctlName === 'usernameCtl') {
      this.usernameCtlErrorMessage = this._getUsernameCtlErrorMessage(
        this.form.get(ctlName)
      );
    }
    if (ctlName === 'passwordCtl') {
      this.passwordCtlErrorMessage = this._getPasswordCtlErrorMessage(
        this.form.get(ctlName)
      );
    }
    this.mainButtonDisabled = this._getMainButtonDisabled(this.form);
    this.mainErrorMessage = '';
  }

  onLoginOrSignup() {
    const username = this.form.get('usernameCtl')?.value;
    const password = this.form.get('passwordCtl')?.value;

    if (this.status === 'signup') {
      this.auth.signup(username, password).subscribe({
        error: (err: IAuthError) => this.mainErrorMessage = err.message
      })
    } else if (this.status === 'login') {
      this.auth.login$(username, password).subscribe({
        error: (err: IAuthError) => this.mainErrorMessage = err.message
      })
    }
  }

  onLogout() {
    this.auth.logout();
  }

  private _getStatus(user: IUser | null): TAuthStatus {
    if (!!user) return 'logout';
    return 'login';
  }

  private _getMainButtonTitle(status: TAuthStatus): string {
    if (status === 'signup') return 'Signup';
    return 'Login';
  }

  private _getDescriptionText(status: TAuthStatus): string {
    if (status === 'signup') return 'Already have an account?';
    return 'Need an account?';
  }

  private _getDescriptionAlternativeText(status: TAuthStatus): string {
    if (status === 'signup') return 'Login';
    return 'Signup';
  }

  private _getMainButtonDisabled(form: FormGroup): boolean {
    return form.invalid;
  }

  private _getUsernameCtlErrorMessage(ctl: AbstractControl | null): string {
    // use the same philosophy has the classes --> error will show synchronously with invalidation of classes!
    if (ctl?.errors?.['required'] && ctl?.touched) return 'Field is required!';
    return '';
  }

  private _getPasswordCtlErrorMessage(ctl: AbstractControl | null): string {
    // use the same philosophy has the classes --> error will show synchronously with invalidation of classes!
    if (ctl?.errors?.['required'] && ctl?.touched) return 'Field is required!';
    if (ctl?.errors?.['minlength'] && ctl?.touched)
      return 'Field requires at least 6 characters!';
    return '';
  }
}
