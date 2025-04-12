import { Component } from '@angular/core';
import { InventoryDTO } from '../../models/interfaces/inventoryDTO';
import { InventoryService } from '../../services/inventory.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViewAlertsComponent } from './view-alerts/view-alerts.component';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, RouterLink, ViewAlertsComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  alerts: InventoryDTO[] = [];
  inventory: InventoryDTO[] = [];
  viewingAlerts : boolean = false;

  constructor(private auth:AuthService, private inventoryService:InventoryService) {
    this.inventoryService = inventoryService;
  }

  ngOnInit() {
    this.inventoryService.getInventoryAlerts().subscribe((data: InventoryDTO[]) => {
      this.alerts = data;
    });
    this.inventoryService.getInventory().subscribe((data: InventoryDTO[]) => {
      this.inventory = data;
    }
    );
  }
  viewAlerts() {
    this.viewingAlerts = true;
  }
  viewInventory() {
    this.viewingAlerts = false;
  }
}
