import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { RegisterPayload } from '../../../core/models/register';
import { RegisterService } from '../../../core/services/register.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    document.body.classList.add('login-page');

    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [passwordMatchValidator()] },
    );
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.toastService.show(
        'Error',
        'Please fill all required fields correctly.',
        'danger',
      );
      return;
    }

    this.isSubmitting = true;
    const payload: RegisterPayload = this.registerForm.value;
    payload.role = 'master';

    this.registerService.register(payload).subscribe({
      next: () => {
        this.toastService.show(
          'Success',
          'Registration successful! Redirecting to login.',
          'success',
          2,
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage =
          err?.error?.message || 'Registration failed. Please try again.';
        this.toastService.show('Error', errorMessage, 'danger');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
