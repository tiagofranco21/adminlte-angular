import { Component } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../shared/components/dashboard/breadcrumb/breadcrumb.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ReadStatisticsComponent } from './components/read-statistics/read-statistics.component';
import { DownloadStatisticsComponent } from './components/download-statistics/download-statistics.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CardComponent,
    ReadStatisticsComponent,
    DownloadStatisticsComponent,
    TranslatePipe,
  ],
  templateUrl: './home.dashboard.component.html',
})
export class HomeDashboardComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/dashboard' },
    { label: 'Dashboard' },
  ];
}
