import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { SaleDTO } from '../../../../models/interfaces/saleDTO';
import { SalesService } from '../../../../services/sales.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../components/icon/icon.component';
import { InventoryService } from '../../../../services/inventory.service';

@Component({
  selector: 'app-admin-view-sale',
  imports: [ModalComponent, CommonModule, IconComponent],
  templateUrl: './admin-view-sale.component.html',
  styleUrl: './admin-view-sale.component.css'
})
export class AdminViewSaleComponent {

  constructor(private saleService: SalesService) {}

  @Input() sale:SaleDTO = {} as SaleDTO;
  @Input() inventoryStocks:{[key:number]:number} = {} as {[key:number]:number};

  error : string = '';

  showModalValue: boolean = false;
  @Input() set showModal(value: boolean) {
    if (!value && this.showModalValue) {
      this.closeModal.emit();
    }
    this.showModalValue = value;
    console.log(this.showModalValue);
  }
  get showModal() {
    return this.showModalValue;
  }
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();


  close() {
    this.showModal = false;
    this.error = '';
  }

  markAsCompleted(id : string) {
    this.saleService.markAsCompleted(id).subscribe({
      next: () => {
        this.close();
        window.location.reload();
      },
      error: (err) => {
        this.error = `Error: HTTP 500`;
      }
    });
  }
  markAsCancelled(id: string) {
    this.saleService.markAsCancelled(id).subscribe({
      next: () => {
        this.close();
        window.location.reload();
      },
      error: (err) => {
        this.error = "Error: HTTP 500"; 
      }
    });
  }
  markAsShipped(id:string) {
    this.saleService.markAsShipped(id).subscribe({
      next: () => {
        this.close();
        window.location.reload();
      },
      error: (err) => {
        this.error = "Error: HTTP 500";
      }
    });
  }
  sufficientStock(){
    return this.sale.productList?.every((product) => {
      return this.inventoryStocks[product.sku] >= product.quantity;
    });
  }
  

}
