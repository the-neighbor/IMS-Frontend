import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierDTO } from '../models/interfaces/supplierDTO';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http:HttpClient, private auth:AuthService) { }

  getSuppliers() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<SupplierDTO[]>(environment.API_URL + environment.SUPPLIERS_PATH, {headers});
  }

  addSupplier(supplier: SupplierDTO) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.post<SupplierDTO>(environment.API_URL + environment.SUPPLIERS_PATH + '/insert', supplier, {headers}).pipe(
      tap((obj) => {
        console.log(obj);
      })
    );
  }
  deleteSupplier(id: number) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.delete<SupplierDTO>(environment.API_URL + environment.SUPPLIERS_PATH + '/delete/' + id, {headers});
  }
  updateSupplier(id: number, supplier: SupplierDTO) {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.put<SupplierDTO>(environment.API_URL + environment.SUPPLIERS_PATH + '/update/' + id, supplier, {headers});
  }
}
