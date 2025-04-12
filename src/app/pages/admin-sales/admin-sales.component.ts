import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { SaleDTO } from '../../models/interfaces/saleDTO';

@Component({
  selector: 'app-admin-sales',
  imports: [CommonModule],
  templateUrl: './admin-sales.component.html',
  styleUrl: './admin-sales.component.css'
})
export class AdminSalesComponent {

  constructor(private sales:SalesService) {}

  salesList: any[] = [];
  ngOnInit() {
    this.sales.getSales().subscribe((data) => {
      this.salesList = data;
    });
  }
  onDelete(saleId: number) {
  }
  onUpdate(saleId: number) {
  }
  products(sale: SaleDTO) {
    return sale.productList || [];
  }
}
