import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { InventoryService } from '../../../services/inventory.service';
import { SuppliersService } from '../../../services/suppliers.service';
import { SalesService } from '../../../services/sales.service';
import { OrdersService } from '../../../services/orders.service';
import { AuthService } from '../../../services/auth.service';
import { ProductDTO } from '../../../models/interfaces/productDTO';
import { OrderDTO } from '../../../models/interfaces/orderDTO';
import { SaleDTO } from '../../../models/interfaces/saleDTO';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { ChartTypeRegistry } from 'chart.js';
import { max } from 'rxjs';
import { SalesProductsGraphComponent } from "../../../components/graphs/sales-products-graph/sales-products-graph.component";
import { SalesOrdersTotalsGraphComponent } from "../../../components/graphs/sales-orders-totals-graph/sales-orders-totals-graph.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [BaseChartDirective, SalesProductsGraphComponent, SalesOrdersTotalsGraphComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  products: ProductDTO[] = [];
  orders: OrderDTO[] = [];
  sales: SaleDTO[] = [];
  chartData: any;
  chartOptions: any;
  chartType: keyof ChartTypeRegistry = 'bar';
  chartName: string = 'SalesOrdersTotals'  //'Bubble - Sales and Orders Over Time';
  graph1name: string = 'ProductSalesTotals';
  graph2name: string = 'SalesOrdersTotals';
  chartsAvailable: {[key: string]: string;} = {
    // 'Bubble - Sales and Orders Over Time',
    'Bubble-ProductsProfitability':'Bubble - Products Profitability',
    'SalesOrdersTotals':'Daily Sale and Order Totals over Time',
    'ProductSalesTotals':'Total Sales by Product',
    'Line-RevenueExpenditures':'Line - Total Revenue and Expenditures Over Time'
  };
  chartsAvailableKeys = Object.keys(this.chartsAvailable);

  changeGraph1(graphName: string) {
    this.graph1name = graphName;
  }
  changeGraph2(graphName: string) {
    this.graph2name = graphName;
  }

  constructor(
  ) {

  }

  ngOnInit() {

  }
}
