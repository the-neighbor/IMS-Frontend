import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';
import { InventoryDTO } from '../models/interfaces/inventoryDTO';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http:HttpClient, private auth:AuthService) {  }

  getInventory() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<any[]>(environment.API_URL + environment.INV_PATH + '/all', { headers });
  }
  getInventoryBySku(sku: number) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<any>(environment.API_URL + environment.INV_PATH + '/sku/' + sku, { headers });
  }
  getInventoryAlerts() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<any[]>(environment.API_URL + environment.IMS_PATH + '/alerts', { headers });
  }
  updateInventory(sku: number, inventory: InventoryDTO) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.put<any>(environment.API_URL + environment.INV_PATH + '/sku/' + sku, inventory, { headers });
  }
}
