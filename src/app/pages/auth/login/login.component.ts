import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, TranslatePipe],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    document.body.classList.add('login-page');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Handles the login action when the user submits the form.
   * Displays a toast if fields are missing or invalid, and attempts
   * to login using AuthService. On success, shows success toast and navigates to /home.
   */
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.toastService.show(
        'Error',
        'Please fill all required fields correctly.',
        'danger',
      );
      return;
    }

    this.isSubmitting = true;

    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      this.isSubmitting = false;
      this.toastService.show(
        'Error',
        'Email and password are required.',
        'danger',
      );
      return;
    }

    this.authService.login(email, password).subscribe((response) => {
      this.isSubmitting = false;
      if (response?.success) {
        // On success, display success toast and navigate to home
        this.toastService.show('Success', 'Login successful!', 'success', 2);
        this.router.navigate(['/dashboard']);
      } else {
        // On error, show error toast
        const message = response?.message || 'Login failed.';
        this.toastService.show('Error', message, 'danger');
      }
    });
  }
}
