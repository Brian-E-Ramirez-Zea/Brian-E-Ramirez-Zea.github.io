import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService, SystemStats } from '../services/dashboard.service';
import { ThemeService } from '../../../shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  stats: SystemStats | null = null;
  private sub!: Subscription;
  private themeSub!: Subscription;

  // Line Chart Data (CPU History)
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'CPU Usage (%)',
        fill: true,
        tension: 0.4,
        borderColor: '#78c2ad', // Minty Green default
        backgroundColor: 'rgba(120, 194, 173, 0.2)',
        pointBackgroundColor: '#78c2ad'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#333' } }
    },
    scales: {
      y: { 
        min: 0, 
        max: 100,
        grid: { color: 'rgba(0,0,0,0.1)' },
        ticks: { color: '#333' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#333' }
      }
    }
  };
  public lineChartLegend = true;

  constructor(
    private dashboardService: DashboardService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // 1. Subscribe to Data
    this.sub = this.dashboardService.getSystemStats().subscribe(data => {
      this.stats = data;
      this.updateChart(data.cpuUsage);
    });

    // 2. Subscribe to Theme Changes
    this.themeSub = this.themeService.theme$.subscribe(theme => {
      this.updateChartTheme(theme);
    });
  }

  updateChartTheme(theme: string) {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#f8f9fa' : '#333';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const lineColor = isDark ? '#a881af' : '#78c2ad'; // Quartz Purple vs Minty Green
    const fillColor = isDark ? 'rgba(168, 129, 175, 0.2)' : 'rgba(120, 194, 173, 0.2)';

    // Update Options
    if (this.lineChartOptions.scales?.['y']) {
      this.lineChartOptions.scales['y'].ticks = { color: textColor };
      this.lineChartOptions.scales['y'].grid = { color: gridColor };
    }
    if (this.lineChartOptions.scales?.['x']) {
      this.lineChartOptions.scales['x'].ticks = { color: textColor };
    }
    if (this.lineChartOptions.plugins?.legend?.labels) {
      this.lineChartOptions.plugins.legend.labels.color = textColor;
    }

    // Update Dataset Colors
    this.lineChartData.datasets[0].borderColor = lineColor;
    this.lineChartData.datasets[0].pointBackgroundColor = lineColor;
    this.lineChartData.datasets[0].backgroundColor = fillColor;

    this.chart?.update();
  }

  updateChart(cpuVal: number) {
    const now = new Date().toLocaleTimeString();
    
    // Add new data
    this.lineChartData.labels?.push(now);
    this.lineChartData.datasets[0].data.push(cpuVal);

    // Keep only last 10 points
    if (this.lineChartData.labels && this.lineChartData.labels.length > 10) {
      this.lineChartData.labels.shift();
      this.lineChartData.datasets[0].data.shift();
    }

    // Trigger update
    this.chart?.update();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.themeSub) this.themeSub.unsubscribe();
  }
}
