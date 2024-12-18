import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

export interface BreadcrumbItem {
  label: string;
  url?: string; // Optional URL for the breadcrumb link
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input() title = '';
  @Input() items: BreadcrumbItem[] = [];
}
