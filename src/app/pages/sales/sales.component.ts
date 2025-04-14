import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { RouterLink } from '@angular/router';
import { ViewSaleComponent } from "./components/view-sale/view-sale.component";
import { SaleDTO } from '../../models/interfaces/saleDTO';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, RouterLink, ViewSaleComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

  showModal: boolean = false;
  selectedSale:SaleDTO = {} as SaleDTO;

  constructor(private sales:SalesService) {}

  salesList: any[] = [];
  ngOnInit() {
    this.sales.getSalesForCurrentUser().subscribe((data) => {
      this.salesList = data;
      console.log(this.salesList);
    });
  }
  onDelete(saleId: number) {
  }
  onUpdate(saleId: number) {
  }
  viewSale(sale: SaleDTO) {
    this.selectedSale = sale;
    this.showModal = true;
  }
}
