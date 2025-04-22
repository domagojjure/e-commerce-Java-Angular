import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH, OktaAuthModule } from '@okta/okta-angular';
import  OktaAuth  from '@okta/okta-auth-js';

import OktaSignIn from '@okta/okta-signin-widget';
import { AuthService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.login()
    }
  }

  login() {
    this.authService.login({ username: this.loginForm.get('username')?.value, password: this.loginForm.get('password')?.value })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/products']); // navigiraj na taj url nakon logina
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }
}

