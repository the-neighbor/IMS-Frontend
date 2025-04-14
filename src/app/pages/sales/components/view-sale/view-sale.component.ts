import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { SaleDTO } from '../../../../models/interfaces/saleDTO';
import { SalesService } from '../../../../services/sales.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../components/icon/icon.component';

@Component({
  selector: 'app-view-sale',
  imports: [ModalComponent, CommonModule, IconComponent],
  templateUrl: './view-sale.component.html',
  styleUrl: './view-sale.component.css'
})
export class ViewSaleComponent {

  constructor(private saleService: SalesService) {}

  @Input() sale:SaleDTO = {} as SaleDTO;

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
  }

  markAsCompleted(id : string) {
    this.saleService.markAsCompleted(id).subscribe(() => {
      this.close();
      window.location.reload();
    });
  }
  markAsCancelled(id: string) {
    this.saleService.markAsCancelled(id).subscribe(() => {
      this.close();
      window.location.reload();
    });
  }
  // markAsShipped() {
  //   this.saleService.markAsShipped(this.sale.saleId).subscribe(() => {
  //     this.close();
  //     window.location.reload();
  //   });
  // }
  

}
