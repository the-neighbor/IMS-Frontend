import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';
import { SuppliersService } from '../../../../services/suppliers.service';

@Component({
  selector: 'app-specify-supplier',
  imports: [FormsModule, CommonModule],
  templateUrl: './specify-supplier.component.html',
  styleUrl: './specify-supplier.component.css'
})
export class SpecifySupplierComponent {

  @Output() supplierSelected = new EventEmitter<SupplierDTO>();
  suppliers: SupplierDTO[] = [];
  selectedSupplier: SupplierDTO | null = null;


  constructor(private suppliersService:SuppliersService)
  {
    this.suppliersService = suppliersService;
  }
  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe((data: SupplierDTO[]) => {
      this.suppliers = data;
    });
  }
  selectSupplier(supplier: SupplierDTO) {
    this.selectedSupplier = supplier;
  }
  onSubmit() {
    if (this.selectedSupplier) {
      this.supplierSelected.emit(this.selectedSupplier);
    }
  }
}
