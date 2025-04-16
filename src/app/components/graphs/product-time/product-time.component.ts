import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { OrdersService } from '../../../services/orders.service';
import { SalesService } from '../../../services/sales.service';
import { SaleDTO } from '../../../models/interfaces/saleDTO';
import { OrderDTO } from '../../../models/interfaces/orderDTO';
import 'chartjs-adapter-date-fns';
import { ChartTypeRegistry } from 'chart.js';
import { max } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-time',
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './product-time.component.html',
  styleUrl: './product-time.component.css'
})
export class ProductTimeComponent {
  constructor(private orders:OrdersService, private sales:SalesService) {}

  @Input()cumulative: boolean = false;
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
    if (!this.cumulative) {
      return this.dailyChartData();
    }
    let cumulativeSales = [{x: 0, y: 0}];
    this.productSales.sort((a, b) => {
      return new Date(a.saleCreated || 0).getTime() - new Date(b.saleCreated || 0).getTime();
    }).forEach((sale) => {
      cumulativeSales.push({y:((sale.productList?.reduce((acc, product) => {
        if (product.sku === this.sku) {
          return acc + product.quantity;
        }
        return acc;
      }, 0) || 0) + cumulativeSales[cumulativeSales.length - 1].y), x: new Date(sale.saleCreated || 0).getTime()});
    });
    let cumulativeOrders = [{x:0, y:0}];
    this.productOrders.sort((a, b) => {
      return new Date(a.orderCreated || 0).getTime() - new Date(b.orderCreated || 0).getTime();
    }).forEach((sale) => {
      cumulativeOrders.push({y:((sale.productList?.reduce((acc, product) => {
        if (product.sku === this.sku) {
          return acc + product.quantity;
        }
        return acc;
      }, 0) || 0) + cumulativeOrders[cumulativeOrders.length - 1].y), x: new Date(sale.orderCreated || 0).getTime()});
    });
    cumulativeOrders.shift();
    cumulativeSales.shift();
    let data = {
      datasets: [
        {
          label: 'Sales',
          // data:     this.productSales.map((sale) => {
          //       return {
          //     x: new Date(sale.saleCreated || 0).getTime(),
          //     y: sale.productList?.reduce((acc, product) => {
          //       if (product.sku === this.sku) {
          //         return acc + product.quantity;
          //       }
          //       return acc;
          //     }, 0)
          //   };
          // }),
          data: cumulativeSales,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Orders',
      //     data: this.productOrders.map((sale) => {
      //       return {
      //     x: new Date(sale.orderCreated || 0).getTime(),
      //     y: sale.productList?.reduce((acc, product) => {
      //       if (product.sku === this.sku) {
      //         return acc + product.quantity;
      //       }
      //       return acc;
      //     }, 0)
      //   };
      // }),
          data: cumulativeOrders,
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
  dailyChartData() {
    let saleDates = this.productSales.map((sale) => {
      return new Date(sale.saleCreated || 0).getTime();
    }
    );
    let saleData = this.productSales.map((sale) => {
      return {
        x: new Date(sale.saleCreated || 0).getTime(),
        y: sale.productList?.reduce((acc, product) => {
          if (product.sku === this.sku) {
            return acc + product.quantity;
          }
          return acc;
        }, 0)
      };
    });
    let saleMap = saleData.reduce((acc, sale) => {
      if (acc.has(sale.x)) {
        acc.get(sale.x).y += sale.y;
      } else {
        acc.set(sale.x, sale);
      }
      return acc;
    }, new Map());
    let orderDates = this.productOrders.map((sale) => {
      return new Date(sale.orderCreated || 0).getTime();
    });
    let orderData = this.productOrders.map((sale) => {
      return {
        x: new Date(sale.orderCreated || 0).getTime(),
        y: sale.productList?.reduce((acc, product) => {
          if (product.sku === this.sku) {
            return acc + product.quantity;
          }
          return acc;
        }, 0)
      };
    }
    );
    let orderMap = orderData.reduce((acc, sale) => {
      if (acc.has(sale.x)) {
        acc.get(sale.x).y += sale.y;
      } else {
        acc.set(sale.x, sale);
      }
      return acc;
    }, new Map());
    let data = {
      datasets: [
        {
          label: 'Sales',
          data:     [...saleMap.values()].sort((a, b) => {
            return a.x - b.x;
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Orders',
          data: [...orderMap.values()].sort((a, b) => {
            return a.x - b.x;
          }),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
    return data as any;
  }
}

