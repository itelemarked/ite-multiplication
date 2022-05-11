import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const MAIL_SUFFIX = '@ite-multiplication.com'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {

  loginState: 'login' | 'logout' = 'login';

  form = this.fb.group({
    'usernameCtl': [{value: '', disabled: this.loginState === 'logout'}, Validators.required],
    'passwordCtl': ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.authState.subscribe(res => {
      if (res === null) {
        this.loginState = 'login';
        this.form.get('usernameCtl')?.enable();
        this.form.reset();
      } else {
        this.loginState = 'logout';
        this.form.get('usernameCtl')?.setValue(res.email?.replace(MAIL_SUFFIX, ''));
        this.form.get('usernameCtl')?.disable();
      }
    })
  }

  onChange(e: any) {
    // this.form.get('usernameCtl')?.setValue(e.target.value.trim())
  }

  signup() {}

  login() {
    const email = this.form.get('usernameCtl')?.value + MAIL_SUFFIX;
    const password = this.form.get('passwordCtl')?.value;
    this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut()
  }

}
