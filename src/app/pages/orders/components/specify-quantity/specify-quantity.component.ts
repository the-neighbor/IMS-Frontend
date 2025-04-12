import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderProductDTO } from '../../../../models/interfaces/orderProductDTO';
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specify-quantity',
  imports: [FormsModule,CommonModule],
  templateUrl: './specify-quantity.component.html',
  styleUrl: './specify-quantity.component.css'
})
export class SpecifyQuantityComponent {



  @Input() selectedItems: OrderProductDTO[] = [];
  @Input() selectedSupplier: SupplierDTO = {} as SupplierDTO;

  @Output() quantitySelected = new EventEmitter<OrderProductDTO[]>();

  constructor() {}
  onSubmit() {
    this.quantitySelected.emit(this.selectedItems);
  }
}
