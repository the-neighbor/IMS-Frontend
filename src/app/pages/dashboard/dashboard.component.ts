import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CommonModule } from '@angular/common';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [AdminDashboardComponent, StaffDashboardComponent, UserDashboardComponent, CommonModule, GuestDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private auth:AuthService) {
    this.auth = auth;
  }
  isAdmin() {
    return this.auth.isAdmin();
  }
  isStaff() {
    return this.auth.isStaff();
  }
  isUser() {
    return this.auth.isUser();
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
