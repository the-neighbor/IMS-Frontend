import { Component } from '@angular/core';
import { ChartTypeRegistry } from 'chart.js';
import { OrderDTO } from '../../../models/interfaces/orderDTO';
import { ProductDTO } from '../../../models/interfaces/productDTO';
import { SaleDTO } from '../../../models/interfaces/saleDTO';
import { AuthService } from '../../../services/auth.service';
import { InventoryService } from '../../../services/inventory.service';
import { OrdersService } from '../../../services/orders.service';
import { ProductService } from '../../../services/product.service';
import { SalesService } from '../../../services/sales.service';
import { SuppliersService } from '../../../services/suppliers.service';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import {Chart} from 'chart.js';

Chart.register(zoomPlugin);
@Component({
  selector: 'app-sales-orders-totals-graph',
  imports: [BaseChartDirective],
  templateUrl: './sales-orders-totals-graph.component.html',
  styleUrl: './sales-orders-totals-graph.component.css'
})
export class SalesOrdersTotalsGraphComponent {

  products: ProductDTO[] = [];
  orders: OrderDTO[] = [];
  sales: SaleDTO[] = [];
  chartData: any;
  chartOptions: any;
  chartType: keyof ChartTypeRegistry = 'bar';
  chartName: string = 'Bar-SalesOrdersTotals'  //'Bubble - Sales and Orders Over Time';
  chartsAvailable = {
    // 'Bubble - Sales and Orders Over Time',
    'Bubble-ProductsProfitability':'Bubble - Products Profitability',
    'Bar-SalesOrdersTotals':'Daily Sale and Order Totals over Time',
    'Line-RevenueExpenditures':'Line - Total Revenue and Expenditures Over Time'
  };

  constructor(private auth:AuthService,
     private productService:ProductService,
    private inventoryService:InventoryService,
    private ordersService:OrdersService,
    private salesService:SalesService,
    private suppliersService:SuppliersService,
  ) {
    this.productService = productService;
    this.inventoryService = inventoryService;
    this.ordersService = ordersService;
    this.salesService = salesService;
    this.suppliersService = suppliersService;
    this.auth = auth;
  }

  ngOnInit() {
    this.getProducts();
    // this.getInventory();
    this.getOrders();
    this.getSales();
    // this.getSuppliers();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.createChart();
    });
  }
  getOrders() {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data;
      this.createChart();
    });
  }
  getSales() {
    this.salesService.getSales().subscribe((data) => {
      this.sales = data;
      this.createChart();
    });
  }

  createChart(){
    if (this.chartName === 'Bar-SalesOrdersTotals') {
      const data = {
        //labels: this.sales.map(sale => new Date(sale.saleCreated!).toLocaleDateString()),
        datasets: [
          {
            label: 'Sales',
            type: 'bar',
            data: this.sales.map(sale => {
              const date = new Date(sale.saleCreated!);
              return {
                x: date,
                y: sale.totalPrice
              };
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: "flex",
            maxBarThickness: 10,
            // categoryPercentage: 0.5,
            // barPercentage: 0.5
          },
          {
            label: 'Orders',
            data: this.orders.map(order => {
              const date = new Date(order.orderCreated!);
              return {
                x: date,
                y: order.totalPrice 
              };
            }),
            type: 'bar',
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: "flex",
            maxBarThickness: 10,
          }
        ]
      };
      const options = {
        responsive: true,
        plugins: {
          
          legend: {
            display: true,
            position: 'top'
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
      this.chartData = data;
      this.chartOptions = options;
    }
    // }
    // const data = {
    //   // labels: this.sales.map(sale => new Date(sale.saleCreated!).toLocaleDateString()),

    //   datasets: [
    //     {
    //       label: 'Sales Over Time',
    //       data: this.sales.map(sale => {
    //         const date = new Date(sale.saleCreated!);
    //         console.log(sale.productList);
    //         const totalQuantity = sale.productList?.map(p=>p.quantity).reduce((a,b)=>a+b,0);
    //         return {
    //           x: date,
    //           y: totalQuantity,
    //           r: sale.totalPrice / 100
              
    //         };
    //       }).sort((a, b) => a.x.getTime() - b.x.getTime()),
    //       borderColor: 'rgba(75, 192, 192, 1)',
    //       backgroundColor: 'rgba(75, 192, 192, 0.4)',
    //       fill: true,
    //       tension: 0
    //     },
    //     {
    //       label: 'Orders Over Time',
    //       data: this.orders.map(order => {
    //         const date = new Date(order.orderCreated!);
    //         const totalQuantity = order.productList?.map(p=>p.quantity).reduce((a,b)=>a+b,0);
    //         return {
    //           x: date,
    //           y: totalQuantity,
    //           r: order.totalPrice /  100

    //         };
    //       }).sort((a, b) => a.x.getTime() - b.x.getTime()),
    //       borderColor: 'rgba(255, 99, 132, 1)',
    //       backgroundColor: 'rgba(255, 99, 132, 0.4)',
    //       fill: true,
    //       tension: 0
    //     }
    //   ]
    // };

    // const options = {
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       display: true,
    //       position: 'top'
    //     },
    //     tooltip: {
    //       mode: 'index',
    //       intersect: false
    //     }
    //   },
    //   scales: {
    //     x: {
    //       type: 'time',
    //       time: {
    //         unit: 'day'
    //       },
    //       title: {
    //         display: true,
    //         text: 'Date'
    //       }
    //     },
    //     y: {
    //       title: {
    //         display: true,
    //         text: 'Sales Amount'
    //       },
    //       beginAtZero: true
    //     }
    //   }
    // };
    // this.chartData = data;
    // this.chartOptions = options;
  }
}
