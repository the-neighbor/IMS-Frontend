import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService:AuthService, private seedService:SeedService) {
    this.authService = authService;
    this.seedService = seedService;
  }


  loggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  isUser() {
    return this.authService.isUser();
  }
  isSeeded() {
    return this.seedService.seeded;
  }
  seedData() {
    this.seedService.seed().subscribe((data)=>{
      window.location.reload();
    });
  }
}
