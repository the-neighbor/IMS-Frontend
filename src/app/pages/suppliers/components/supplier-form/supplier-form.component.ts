import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuppliersService } from '../../../../services/suppliers.service';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../components/icon/icon.component';
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';

@Component({
  selector: 'app-supplier-form',
  imports: [FormsModule, ReactiveFormsModule, ModalComponent, CommonModule, IconComponent],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent {

  @Input() editMode: boolean = false;
  @Input() set supplier(supplier: SupplierDTO) {
    this.supplierForm.patchValue(supplier);
    console.log(supplier);
  }
  showModalValue: boolean = false;
  @Input() set showModal(value: boolean) {
    if (!value && this.showModalValue) {
      this.closeModal.emit();
    }
    this.showModalValue = value;
  }
  get showModal() {
    return this.showModalValue;
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  supplierForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    contactInfo: new FormControl(''),
    rating: new FormControl('')
  });

  constructor(private suppliers:SuppliersService) {
    this.suppliers = suppliers;
  }

  onSubmit() {
    if (this.editMode) {
      this.suppliers.updateSupplier(this.supplier.id , this.supplierForm.value).subscribe((data) => {
        window.location.reload();
      });
    }
    else
    this.suppliers.addSupplier(this.supplierForm.value).subscribe((data) => {
      window.location.reload();
    });
  }
  close() {
    this.showModal = false;
  }
}
