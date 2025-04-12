import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, RouterLink],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

  constructor(private sales:SalesService) {}

  salesList: any[] = [];
  ngOnInit() {
    this.sales.getSalesForCurrentUser().subscribe((data) => {
      this.salesList = data;
    });
  }
  onDelete(saleId: number) {
  }
  onUpdate(saleId: number) {
  }

}
