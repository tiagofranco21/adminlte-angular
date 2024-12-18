import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() title = '';
  @Input() headerClass = '';

  @HostBinding('class.col-md-6') get defaultSize() {
    return !this.isMaximized;
  }

  @HostBinding('class.col-md-12') get maximizedSize() {
    return this.isMaximized;
  }

  isMaximized = false;

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
  }
}
