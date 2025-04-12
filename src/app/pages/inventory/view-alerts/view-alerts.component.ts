import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryDTO } from '../../../models/interfaces/inventoryDTO';import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
;

@Component({
  selector: 'app-view-alerts',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-alerts.component.html',
  styleUrl: './view-alerts.component.css'
})
export class ViewAlertsComponent {


  @Input() alerts: InventoryDTO[] = [];
  @Output() viewInventory = new EventEmitter();


  onViewInventory() {
    this.viewInventory.emit("true");
  }
}
