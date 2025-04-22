import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();

    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      
    });
    
    this.authService.userName$.subscribe(username => {
      if (username) {
        this.userFullName = username;
      } 
    });

    this.authService.role$.subscribe(role => {
      if (role) {
        this.role = role;
      } 
    });
    
  }
  
  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/products']);
  }

}