import { Injectable } from '@angular/core';
import { LoginDTO } from '../models/interfaces/loginDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { RegisterDTO } from '../models/interfaces/registerDTO';
import { AuthResponseDTO } from '../models/interfaces/authResponseDTO';
import { ResponseObject } from '../models/interfaces/responseObject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isEmailTaken(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  
  isAdmin(): boolean {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      return false;
    }
    let payload = token.split('.')[1];
    let decodedPayload = atob(payload);
    let payloadJSON = JSON.parse(decodedPayload);
    // console.log(payloadJSON);
    return this.isLoggedIn() && payloadJSON?.role == 'ADMIN';
  }
  isUser(): boolean {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      return false;
    }
    let payload = token.split('.')[1];
    let decodedPayload = atob(payload);
    let payloadJSON = JSON.parse(decodedPayload);
    // console.log(payloadJSON);
    return this.isLoggedIn() && payloadJSON?.role == 'USER';
  }
  isStaff(): boolean {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      return false;
    }
    let payload = token.split('.')[1];
    let decodedPayload = atob(payload);
    let payloadJSON = JSON.parse(decodedPayload);
    // console.log(payloadJSON);
    return this.isLoggedIn() && (payloadJSON?.role == 'STAFF' || payloadJSON?.role == 'ADMIN');
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  TokenExpired(): boolean {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      return true;
    }
    let payload = token.split('.')[1];
    let decodedPayload = atob(payload);
    let payloadJSON = JSON.parse(decodedPayload);
    return payloadJSON?.exp * 1000 < Date.now();
  }

  getUsername(): string | null {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      return null;
    }
    let payload = token.split('.')[1];
    let decodedPayload = atob(payload);
    let payloadJSON = JSON.parse(decodedPayload);
    return payloadJSON?.sub;
  }

  getName(): string | null {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      return null;
    }
    let payload = token.split('.')[1];
    let decodedPayload = atob(payload);
    let payloadJSON = JSON.parse(decodedPayload);
    console.log(payloadJSON); 
    return payloadJSON?.name;
  }

  login(loginDTO: LoginDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(environment.API_URL +  environment.LOGIN_PATH, loginDTO).pipe(
      tap(
        (obj)=> {
          sessionStorage.setItem('token', obj.data);
        }
      )
    )
  }
  register(registerDTO: RegisterDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(environment.API_URL +  environment.REGISTER_PATH, registerDTO)
  }
  checkEmail(email: string): Observable<ResponseObject> 
  {
    return this.http.post<ResponseObject>(environment.API_URL + '/security/isemailtaken', email);
  }
}
