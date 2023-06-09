import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorsService } from '../../services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private router = inject(Router);

  error: string | null = null;

  registerForm = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  isFieldValid(field: string) {
    return this.validatorsService.isFieldValid(this.registerForm, field);
  }

  onSubmit(): void {
    // if (this.registerForm.invalid) {
    //   console.log('invalid form. Check logic.');

    //   return;
    // }
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: (currentUser) => {
        // * to save token:
        this.authService.setToken(currentUser);
        // * save user on whole app:
        this.authService.setCurrentUser(currentUser);
        // * take user to:
        this.router.navigateByUrl('/pm/boards');
      },
      error: (err: HttpErrorResponse) => {
        // * because we know errors come as an array from backend:
        this.error = err.error.join(', ');
      },
    });
  }
}
