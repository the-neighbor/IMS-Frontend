import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { RouterLink } from '@angular/router';
import { OrderDTO } from '../../models/interfaces/orderDTO';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private orders:OrdersService) {}

  ordersList: OrderDTO[] = [];
  ngOnInit() {
    this.orders.getOrders().subscribe((data) => {
      this.ordersList = data;
    });
  }
  onDelete(orderId: number) {
  }
  onUpdate(orderId: number) {
  }

}
