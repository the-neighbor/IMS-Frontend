import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductDTO } from '../models/interfaces/productDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private auth:AuthService) { }

  getProducts() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<ProductDTO[]>(environment.API_URL + environment.IMS_PATH + "/products", { headers });
  }

  getProductBySku(sku: number) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<ProductDTO>(environment.API_URL + environment.IMS_PATH + "/products/sku/" + sku, { headers });
  }

  addProduct(product: ProductDTO) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.post<ProductDTO>(environment.API_URL + environment.IMS_PATH + "/products/add", product, { headers });
  }
  deleteProduct(sku: number) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.delete<ProductDTO>(environment.API_URL + environment.IMS_PATH + "/products/sku/" + sku, { headers });
  }
  updateProduct(sku: number, product: ProductDTO) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.put<ProductDTO>(environment.API_URL + environment.IMS_PATH + "/products/sku/" + sku, product, { headers });
  }
}
