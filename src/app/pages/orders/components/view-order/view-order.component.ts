import { Component } from '@angular/core';
import { OrderDTO } from '../../../../models/interfaces/orderDTO';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { OrdersService } from '../../../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-order',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {

  orderId: string = '';
  order: OrderDTO = {} as OrderDTO;

  constructor(private authService:AuthService, private orderService: OrdersService, private activatedRoute:ActivatedRoute) {
    this.authService = authService;
    this.orderService = orderService;
    this.activatedRoute = activatedRoute;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params['orderId'];
      this.getOrderById(this.orderId);
    });
  }
  getOrderById(orderId: string) {
    this.orderService.getOrderById(orderId).subscribe((data: OrderDTO) => {
      this.order = data;
    });
  }
  back(){
    window.history.back();
  }
  markAsCompleted(orderId: string) {
    this.orderService.markAsCompleted(orderId).subscribe((data: OrderDTO) => {
      this.order = data;
    });
  }

}
