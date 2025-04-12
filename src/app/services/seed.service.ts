import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  seeded = false;
  constructor(private http:HttpClient, private auth:AuthService) { }
  seed() {
    const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
    return this.http.get<{[key:string]:string}>(environment.API_URL + environment.SEED_PATH + "/all", { headers }).pipe(
      tap((obj : {[key:string]:string}) => {
        if (obj && obj['message'] && obj['successful'] == 'true') {
          console.log(obj);
        }
      })
    );
  }
}
