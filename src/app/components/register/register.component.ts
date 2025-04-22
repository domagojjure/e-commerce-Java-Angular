import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const credentials = this.registerForm.value;
      this.register()
    }
  }

  register() {
    this.authService.register({ username: this.registerForm.get('username')?.value, password: this.registerForm.get('password')?.value, role: "ROLE_CUSTOMER" })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/products']); // navigiraj na taj url nakon registera
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }

}
