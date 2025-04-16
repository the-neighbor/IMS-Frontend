import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { RouterLink } from '@angular/router';
import { OrderDTO } from '../../models/interfaces/orderDTO';
import { ModalComponent } from "../../components/modal/modal.component";
import { PlaceOrderComponent } from "./components/place-order/place-order.component";

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterLink, ModalComponent, PlaceOrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {


  showModal: boolean = false;
  updateMode: boolean = false;
  selectedOrder: OrderDTO = {} as OrderDTO;
  sortField: string = 'orderId';
  sortDirection: string = 'asc';

  constructor(private orders:OrdersService) {}


  fields: string[] = [
    'orderId',
    'totalPrice',
    'productList',
    'supplier',
    'orderCreated',
    'orderUpdated',
    'orderCompleted',
    'orderStatus'
  ];
  visibleFields = [
    { name: 'orderCreated', displayName: 'Order Created' },
    { name: 'orderStatus', displayName: 'Order Status' },
    { name: 'orderId', displayName: 'Order ID' },
    { name: 'totalPrice', displayName: 'Total Price' },
    { name: 'productList', displayName: 'Product List' },
    { name: 'supplier', displayName: 'Supplier' }
  ];
  

  ordersList: OrderDTO[] = [];
  ngOnInit() {
    this.orders.getOrders().subscribe((data) => {
      this.ordersList = data;
    });
  }

  sortBy(field: string) {
    this.sortField = field;
    let keyField = field as keyof OrderDTO;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.ordersList.sort((a, b) => {
      const a1 = a[keyField] || '';
      const b1 = b[keyField] || '';
      if (this.sortDirection === 'asc') {
        return a1 > b1 ? 1 : -1;
      } else {
        return a1 < b1 ? 1 : -1;
      }
    });
  }

  onAdd() {
    this.showModal = true;
    this.updateMode = false;
    this.selectedOrder = {} as OrderDTO;
    console.log(this.showModal);
  }

  onClose() {
    this.showModal = false;
    this.updateMode = false;
    console.log(this.showModal);
    this.selectedOrder = {} as OrderDTO;
  }

  onSubmit(order: OrderDTO) {
    if (this.updateMode) {
      this.orders.updateOrder(order).subscribe(() => {
        window.location.reload();
      });
    }
    else {
      this.orders.placeOrder(order).subscribe(() => {
        window.location.reload();
      });
    }
  }
  onDelete(orderId: string) {
    this.orders.deleteOrder(orderId).subscribe(() => {
      window.location.reload();
    });
  }
  onUpdate(orderId: string) {
    this.updateMode = true;
    this.showModal = true;
    this.selectedOrder = this.ordersList.find((order) => order.orderId === orderId) as OrderDTO;
  }

}
