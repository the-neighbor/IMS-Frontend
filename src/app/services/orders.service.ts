import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../models/interfaces/orderDTO';
import { environment } from '../../environments/environment.development';
import { ProductDTO } from '../models/interfaces/productDTO';
import { SupplierDTO } from '../models/interfaces/supplierDTO';
import { AuthService } from './auth.service';
import { OrderRequestDTO } from '../models/interfaces/orderRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient, private auth:AuthService) { 

  }
  // currentOrder = {
  //   orderId: '',
  //   productList: [] as ProductDTO[],
  //   totalPrice: 0,
  //   supplier: {} as SupplierDTO
  // } as OrderDTO;

  getOrders() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<OrderDTO[]>(environment.API_URL + environment.ORDERS_PATH + "/", { headers });
  }

  getOrderById(id: string) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<OrderDTO>(environment.API_URL + environment.ORDERS_PATH + "/" + id, { headers });
  }

  placeOrder(order: OrderDTO) {

    // const orderRequest : OrderRequestDTO = {
    //   supplier_id: order.supplier.id,
    //   productSkusAndQuantities:{}
    // };
    // order.productList?.forEach((p)=>{
    //   orderRequest.productSkusAndQuantities[p.sku] = p.quantity;
    // });
    order.productList = order.productList?.map((p) => {
      return {
        ...p,
        price: p.buyPrice
      };
    });
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.post<OrderDTO>(environment.API_URL + environment.IMS_PATH + '/orders/place', order, { headers });
  }

  deleteOrder(id : string) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.delete<OrderDTO>(environment.API_URL + environment.ORDERS_PATH + "/" + id, { headers });
  }
  updateOrder(order: OrderDTO) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.put<OrderDTO>(environment.API_URL + environment.ORDERS_PATH + "/" + order.orderId, order, { headers });
  }

  // getOrdersBySupplier(supplierId: number) {
  //   const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
  //   return this.http.get<OrderDTO[]>(environment.API_URL + environment.ORDERS_PATH + "/supplier/" + supplierId, { headers });
  // }

  getOrdersBySku(sku: number) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<OrderDTO[]>(environment.API_URL + environment.ORDERS_PATH + "/sku/" + sku, { headers });
  }
  getOrdersBySupplierId(supplierId: number) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<OrderDTO[]>(environment.API_URL + environment.ORDERS_PATH + "/supplier/" + supplierId, { headers });
  }
  markAsCompleted(id: string) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.post<OrderDTO>(environment.API_URL + environment.ORDERS_PATH + "/mark-complete/" + id, {}, { headers });
  }
  getTotalOrdersForEachSku() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<Map<number,number>>(environment.API_URL + environment.ORDERS_PATH + "/totalorders/sku", { headers });
  }
  getTotalExpendituresForEachSku() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<Map<number,number>>(environment.API_URL + environment.ORDERS_PATH + "/totalexpenditures/sku", { headers });
  }
}
