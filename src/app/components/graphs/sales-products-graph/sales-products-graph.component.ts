import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective, NG_CHARTS_CONFIGURATION } from 'ng2-charts';
import { SaleDTO } from '../../../models/interfaces/saleDTO';
import { OrderDTO } from '../../../models/interfaces/orderDTO';
import { ChartTypeRegistry } from 'chart.js';
import { OrdersService } from '../../../services/orders.service';
import { SalesService } from '../../../services/sales.service';
import zoomPlugin, { zoom } from 'chartjs-plugin-zoom';
import {Chart} from 'chart.js';

Chart.register(zoomPlugin);
@Component({
  selector: 'app-sales-products-graph',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './sales-products-graph.component.html',
  styleUrl: './sales-products-graph.component.css'
})
export class SalesProductsGraphComponent {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective
  set (chart: BaseChartDirective) {
    this.chart = chart;
    (chart as any).chart.register(zoomPlugin);
  }


  constructor(private orders:OrdersService, private sales:SalesService) {
  }

  @Input()sku: number = 0;
  productSales: Map<string, number> = new Map<string, number>();
  productOrders: Map<string, number> = new Map<string, number>();

  ngOnInit() {
    this.orders.getTotalOrdersForEachSku().subscribe((data: any) => {
      this.productOrders = new Map<string, number>();
      Array.from(Object.keys(data)).forEach((k) => {
        this.productOrders.set((k), data[Number(k)] || 0);
      });
  } 
  );
    this.sales.getTotalSalesForEachSku().subscribe((data: any) => {
      this.productSales = new Map<string, number>();
      Array.from(Object.keys(data)).forEach((k) => {
        this.productSales.set(k, data[k] || 0);
      });
      console.log(this.productSales);
  });
}

chartData() {
    let data = {
      labels: Array.from(this.productSales.keys()),
      datasets: [
        {
          label: 'Sales',
          data: Array.from(this.productSales.values()),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        // {
        //   label: 'Orders',

        //   data: [...this.productOrders?.entries()],
        //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //   borderColor: 'rgba(54, 162, 235, 1)',
        //   borderWidth: 1
        // }
      ]
    };
    return data as any;
  }
  chartOptions : any = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top' as "top",
        },
        tooltip: {

        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'x'
          },
          pan: {
            enabled: true,
            mode: 'xy'
          },
          limits: {
            x: {
              min: 'original',
              max: 'original',
              minRange: 0.1
            },
            y: {
              min: 'original',
              max: 'original',
              minRange: 0.1
            }
          }
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Sales Amount'
          },
          beginAtZero: true
        }
      }
    };
  chartType: keyof ChartTypeRegistry = 'bar';
}
