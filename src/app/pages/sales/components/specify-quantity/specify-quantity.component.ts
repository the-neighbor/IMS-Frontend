import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaleProductDTO } from '../../../../models/interfaces/saleProductDTO';
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



  @Input() selectedItems: SaleProductDTO[] = [];
  @Input() selectedSupplier: SupplierDTO = {} as SupplierDTO;

  @Output() quantitySelected = new EventEmitter<SaleProductDTO[]>();

  constructor() {}
  onSubmit() {
    this.quantitySelected.emit(this.selectedItems);
  }
}
