import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuppliersService } from '../../../../services/suppliers.service';

@Component({
  selector: 'app-supplier-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent {

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
    this.suppliers.addSupplier(this.supplierForm.value).subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }
}
