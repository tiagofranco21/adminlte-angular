import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  standalone: true,
  selector: 'app-toast',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.getToasts().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeToast(id: number): void {
    this.toastService.removeToast(id);
  }
}
