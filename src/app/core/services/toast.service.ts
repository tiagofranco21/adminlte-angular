import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  title: string;
  message: string;
  type: 'blank' | 'success' | 'warning' | 'info' | 'danger' | 'maroon';
  id: number;
  timeout?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private nextId = 1;

  getToasts(): Observable<Toast[]> {
    return this.toastsSubject.asObservable();
  }

  show(
    title = 'Message',
    message: string,
    type: Toast['type'] = 'blank',
    timeoutInSeconds?: number,
  ): void {
    const timeout = timeoutInSeconds ? timeoutInSeconds * 1000 : undefined;
    const toast: Toast = { title, message, type, id: this.nextId++, timeout };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (timeout !== undefined) {
      setTimeout(() => this.removeToast(toast.id), timeout);
    }
  }

  removeToast(id: number): void {
    const updatedToasts = this.toastsSubject.value.filter(
      (toast) => toast.id !== id,
    );
    this.toastsSubject.next(updatedToasts);
  }
}
