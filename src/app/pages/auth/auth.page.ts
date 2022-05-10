import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {

  form = this.fb.group({
    'usernameCtl': ['', Validators.required],
    'passwordCtl': ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // console.log('signin')
    // signInWithEmailAndPassword(this.auth, "loïc@ite-multiplication.com", "111111");
  }

  onChange(e: any) {
    // this.form.get('usernameCtl')?.setValue(e.target.value.trim())
  }

}
