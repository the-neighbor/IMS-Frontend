import { Component } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { SupplierDTO } from '../../models/interfaces/supplierDTO';
import { CommonModule } from '@angular/common';
import { SupplierFormComponent } from "./components/supplier-form/supplier-form.component";

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, SupplierFormComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  constructor(private suppliersService: SuppliersService) {}

  suppliers: SupplierDTO[] = [];

  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe((data: SupplierDTO[]) => {
      this.suppliers = data;
    });
  }
  onDelete(supplierId: number) {
    this.suppliersService.deleteSupplier(supplierId).subscribe((data: SupplierDTO) => {
      window.location.reload();
    });
  }
  onUpdate(supplierId: number) {
    // this.suppliersService.updateSupplier(supplierId, this.suppliers.find((s) => s.id === supplierId)).subscribe((data: SupplierDTO) => {
    //   window.location.reload();
    // });
  }
  selectSupplier(id:number) {
    // this.selectedSupplier = this.suppliers.find((s) => s.id === id);
  }
}

