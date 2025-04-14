import { Component } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { SupplierDTO } from '../../models/interfaces/supplierDTO';
import { CommonModule } from '@angular/common';
import { SupplierFormComponent } from "./components/supplier-form/supplier-form.component";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, SupplierFormComponent, ModalComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  constructor(private suppliersService: SuppliersService) {}

  suppliers: SupplierDTO[] = [];
  selectedSupplier: SupplierDTO = {} as SupplierDTO;
  editMode: boolean = false;
  addEditModalOpen: boolean = false;
  openModal() {
    this.addEditModalOpen = true;
  }
  closeModal() {
    this.addEditModalOpen = false;
    this.selectedSupplier = {} as SupplierDTO;
    this.editMode = false;
  }

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
  onUpdate(supplier: SupplierDTO) {
    this.editMode = true;
    this.selectedSupplier = supplier;
    // this.selectSupplier(supplierId);
    this.openModal();
    // this.suppliersService.updateSupplier(supplierId, this.suppliers.find((s) => s.id === supplierId)).subscribe((data: SupplierDTO) => {
    //   window.location.reload();
    // });
  }

  onAdd() {
    this.editMode = false;
    this.openModal();
  }

  selectSupplier(id:number) {
     this.selectedSupplier = this.suppliers.find((s) => s.id === id) || {} as SupplierDTO;
  }
}

