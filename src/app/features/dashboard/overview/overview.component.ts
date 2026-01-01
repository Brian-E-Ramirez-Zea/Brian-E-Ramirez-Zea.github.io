import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService, SystemStats } from '../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit, OnDestroy {
  stats: SystemStats | null = null;
  private sub!: Subscription;

  // Line Chart Data (CPU History)
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'CPU Usage (%)',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: { min: 0, max: 100 }
    }
  };
  public lineChartLegend = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.sub = this.dashboardService.getSystemStats().subscribe(data => {
      this.stats = data;
      this.updateChart(data.cpuUsage);
    });
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

    // Trigger update (reassigning reference for OnPush/ChangeDetection)
    this.lineChartData = { ...this.lineChartData };
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
