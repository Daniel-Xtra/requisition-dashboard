import { Component, OnInit, Signal, inject, signal } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // user: TUser;

  // user2 = signal<TUser>(null);
  private apiService = inject(ApiService);
  user = this.apiService.appUser;
  myChart: Chart;
  datasets = [
    [2, 4, 8, 20, 3, 9, 8, 41, 23, 15, 18, 12],
    [32, 23, 16, 1, 4, 47, 30, 21, 18, 30, 2, 3],
    [40, 20, 5, 25, 10, 40, 15, 40, 50, 20, 1, 7],
  ];

  constructor() {
    // this.user2 = this.apiService.appUser;
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    var my = document.getElementById('myChart') as HTMLCanvasElement;
    this.myChart = new Chart(my, {
      type: 'bar',
      data: {
        // labels: [
        //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        //   20, 21, 22,
        // ],
        labels: [
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
        ],

        datasets: [
          {
            label: 'Pending',
            data: this.datasets[0],
            backgroundColor: '#DE350B',
            borderColor: '#DE350B',

            // tension: 0.5,
          },
          {
            label: 'Approved',
            data: this.datasets[1],
            backgroundColor: '#FFE380',
            borderColor: '#FFE380',

            // tension: 0.5,
          },
          {
            label: 'Issued',
            data: this.datasets[2],
            backgroundColor: '#006644',
            borderColor: '#006644',

            // tension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,

        scales: {
          y: {
            display: true,
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            // ticks: {
            //   callback: function (value, index, values) {
            //     return float2dollar(value);
            //   },
            // },
            suggestedMin: 0,
            suggestedMax: 60,
          },
          x: {
            grid: {
              drawTicks: true,
              drawOnChartArea: false,
              display: false,
            },
          },
        },
      },
    });
  }
}
