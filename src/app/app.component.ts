import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  providers:[AuthService, ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'capstone-frontend';
}
