import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { TranslateService } from '../../../../../core/services/translate.service';

Chart.register(...registerables);

@Component({
  selector: 'app-read-statistics',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './read-Statistics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadStatisticsComponent implements OnInit {
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
        label: 'Reads',
        data: this.generateRandomData(),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
      'chartReadStatistics',
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

    const translatedDatasetLabel = this.translateService.getTranslate('Reads');

    this.chartData.labels = translatedLabels;
    this.chartData.datasets[0].label = translatedDatasetLabel;

    this.chart.update();
  }
}
