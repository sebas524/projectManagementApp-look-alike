import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../services/validators.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private router = inject(Router);
  error: string | null = null;

  loginForm = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  isFieldValid(field: string) {
    return this.validatorsService.isFieldValid(this.loginForm, field);
  }

  onSubmit(): void {
    // if (this.registerForm.invalid) {
    //   console.log('invalid form. Check logic.');

    //   return;
    // }
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (currentUser) => {
        // * to save token:
        this.authService.setToken(currentUser);
        // * save user on whole app:
        this.authService.setCurrentUser(currentUser);
        this.error = null;
        this.router.navigateByUrl('/pm/boards');
      },
      error: (err: HttpErrorResponse) => {
        // * because we know errors come as an array from backend:
        this.error = 'Invalid credentials';
      },
    });
  }
}
