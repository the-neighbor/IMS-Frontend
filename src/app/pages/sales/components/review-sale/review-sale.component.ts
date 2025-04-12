import { Component, Input } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { SaleDTO } from '../../../../models/interfaces/saleDTO';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-sale',
  imports: [CommonModule],
  templateUrl: './review-sale.component.html',
  styleUrl: './review-sale.component.css'
})
export class ReviewSaleComponent {


  @Input() finalSale: SaleDTO | null = null;

  constructor(private salesService:SalesService, private router:Router) {
    this.salesService = salesService;
  }

  placeSale() {
    if (this.finalSale) {
      this.salesService.placeSale(this.finalSale).subscribe((response) => {
        console.log('Sale placed successfully', response);
        this.router.navigate(['/sales']);
      });
    }
  }
}
