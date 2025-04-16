import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { OrdersService } from '../../../services/orders.service';
import { SalesService } from '../../../services/sales.service';
import { SaleDTO } from '../../../models/interfaces/saleDTO';
import { OrderDTO } from '../../../models/interfaces/orderDTO';
import 'chartjs-adapter-date-fns';
import { ChartTypeRegistry } from 'chart.js';
import { max } from 'rxjs';

@Component({
  selector: 'app-product-time',
  imports: [BaseChartDirective],
  templateUrl: './product-time.component.html',
  styleUrl: './product-time.component.css'
})
export class ProductTimeComponent {
  constructor(private orders:OrdersService, private sales:SalesService) {}


  @Input()sku: number = 0;
  productSales: SaleDTO[] = [];
  productOrders: OrderDTO[] = [];

  ngOnInit() {
    this.orders.getOrdersBySku(this.sku).subscribe((data) => {
      this.productOrders = data.sort((a, b) => {
        return new Date(a.orderCreated || 0).getTime() - new Date(b.orderCreated || 0).getTime();
    }  );
    console.log(this.productOrders);
  });
    this.sales.getSalesBySku(this.sku).subscribe((data) => {
      this.productSales = data.sort((a, b) => {
        return new Date(a.saleCreated || 0).getTime() - new Date(b.saleCreated || 0).getTime();
    });
  });
  } 
  chartData() {

    let data = {
      datasets: [
        {
          label: 'Sales',
          data:     this.productSales.map((sale) => {
                return {
              x: new Date(sale.saleCreated || 0).getTime(),
              y: sale.productList?.reduce((acc, product) => {
                if (product.sku === this.sku) {
                  return acc + product.quantity;
                }
                return acc;
              }, 0)
            };
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Orders',
          data: this.productOrders.map((sale) => {
            return {
          x: new Date(sale.orderCreated || 0).getTime(),
          y: sale.productList?.reduce((acc, product) => {
            if (product.sku === this.sku) {
              return acc + product.quantity;
            }
            return acc;
          }, 0)
        };
      }),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
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

        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          title: {
            display: true,
            text: 'Date'
          },
        },
        y: {
          title: {
            display: true,
            text: 'Sales Amount'
          },
          beginAtZero: true
        }
      }
    };
  chartType: keyof ChartTypeRegistry = 'line';
}

