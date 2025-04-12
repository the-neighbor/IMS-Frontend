import { Component, Input } from '@angular/core';
import { OrdersService } from '../../../../services/orders.service';
import { OrderDTO } from '../../../../models/interfaces/orderDTO';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-order',
  imports: [CommonModule],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css'
})
export class ReviewOrderComponent {


  @Input() finalOrder: OrderDTO | null = null;

  constructor(private ordersService:OrdersService, private router:Router) {
    this.ordersService = ordersService;
  }

  placeOrder() {
    if (this.finalOrder) {
      this.ordersService.placeOrder(this.finalOrder).subscribe((response) => {
        console.log('Order placed successfully', response);
        this.router.navigate(['/orders']);
      });
    }
  }
}
