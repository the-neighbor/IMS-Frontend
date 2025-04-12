import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleDTO } from '../models/interfaces/saleDTO';
import { environment } from '../../environments/environment.development';
import { ProductDTO } from '../models/interfaces/productDTO';
import { SupplierDTO } from '../models/interfaces/supplierDTO';
import { AuthService } from './auth.service';
import { SaleRequestDTO } from '../models/interfaces/saleRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, private auth: AuthService) {

  }
  // currentSale = {
  //   saleId: '',
  //   productList: [] as ProductDTO[],
  //   totalPrice: 0,
  //   supplier: {} as SupplierDTO
  // } as SaleDTO;

  getSales() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<SaleDTO[]>(environment.API_URL + environment.SALES_PATH, { headers });
  }
  getSalesForCurrentUser() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<SaleDTO[]>(environment.API_URL + environment.SALES_PATH + '/user/' + this.auth.getUsername(), { headers });
  }
  placeSale(sale: SaleDTO) {
    // const saleRequest: SaleRequestDTO = {
    //   customerUsername: sale.customerUsername,
    //   productSkusAndQuantities: {}
    // };
    // sale.productList?.forEach((p) => {
    //   saleRequest.productSkusAndQuantities[p.sku] = p.quantity;
    // });
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.post<SaleDTO>(environment.API_URL + environment.SALES_PATH + '/place', sale, { headers });
  }
}
