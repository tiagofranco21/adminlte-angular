import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { TranslateService } from '../../../../../core/services/translate.service';

Chart.register(...registerables);
@Component({
  selector: 'app-download-statistics',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './download-statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadStatisticsComponent implements OnInit {
  chart!: Chart;
  monthKeys: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Downloads',
        data: this.generateRandomData(),
        backgroundColor: 'rgba(17, 50, 0, 0.6)',
        borderColor: 'rgba(7, 19, 0, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.createChart();

    this.translateService.getCurrentLang().subscribe(() => {
      this.updateChartLabels();
    });
  }

  createChart(): void {
    const ctx = document.getElementById(
      'chartDownloadStatistics',
    ) as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }

  generateRandomData(): number[] {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  }

  updateChart(): void {
    this.chartData.datasets[0].data = this.generateRandomData();
    this.chart.update();
  }
  updateChartLabels(): void {
    const translatedLabels = this.monthKeys.map((key) =>
      this.translateService.getTranslate(key),
    );

    const translatedDatasetLabel =
      this.translateService.getTranslate('Downloads');

    this.chartData.labels = translatedLabels;
    this.chartData.datasets[0].label = translatedDatasetLabel;

    this.chart.update();
  }
}
