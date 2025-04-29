import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import { OrdersService } from '../../../services/orders.service';
import { SalesService } from '../../../services/sales.service';
import { SupplierDTO } from '../../../models/interfaces/supplierDTO';
import { OrderDTO } from '../../../models/interfaces/orderDTO';
import { SaleDTO } from '../../../models/interfaces/saleDTO';

@Component({
  selector: 'app-staff-dashboard',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css'
})
export class StaffDashboardComponent {

  constructor(private suppliersService:SuppliersService, private ordersService:OrdersService, private salesService:SalesService) { 
  }

  suppliers: SupplierDTO[] = [];
  orders: OrderDTO[] = [];
  sales: SaleDTO[] = [];

  ngOnInit() {
    this.getSuppliers();
    this.getOrders();
    this.getSales();
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
  }

  getOrders() {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  getSales() {
    this.salesService.getSales().subscribe((data) => {
      this.sales = data;
    });
  }

  
}
