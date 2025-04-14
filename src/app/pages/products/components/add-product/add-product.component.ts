import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { ModalComponent } from "../../../../components/modal/modal.component";
import { SpecifySupplierComponent } from "../../../orders/components/specify-supplier/specify-supplier.component";
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';
import { ProductFormComponent } from '../product-form/product-form.component';
import { IconComponent } from "../../../../components/icon/icon.component";

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, ReactiveFormsModule, ModalComponent, SpecifySupplierComponent, ProductFormComponent, IconComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  private _selectedProduct : ProductDTO | undefined;

  @Input() 
  public set selectedProduct(value : ProductDTO | undefined)
  {
    this._selectedProduct = value;
    this.selectedSku = value?.sku;
    this.productForm.reset(value);
  }
  public get selectedProduct() {
    return this._selectedProduct;
  }

  selectedSku : number | undefined;
  @Input() editMode: boolean = false;

  constructor(private productService:ProductService) { }

  productForm: FormGroup = new FormGroup({
    sku: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    initial_stock: new FormControl(0),
    buyPrice: new FormControl(0),
    sellPrice: new FormControl(0),
    supplierId: new FormControl(0),
    supplierName: new FormControl('')
  });

  selectedSupplier: SupplierDTO | undefined;

  phase:number = 0;
  next() {
    this.phase++;
  }
  back() {
    this.phase--;
  }

  showModalValue: boolean = false;
  @Input()set showModal(value: boolean) {
    if (!value && this.showModalValue) {
      this.closeModal.emit();
    }
    this.showModalValue = value;
    console.log(this.showModalValue);
    // if (value) {
    //   this.registerForm.reset();
    // }
  }
  get showModal() {
    return this.showModalValue;
  }
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onSupplierSelected(supplierDTO: SupplierDTO) {
    this.selectedSupplier = supplierDTO;
    this.productForm.patchValue({ supplierId: supplierDTO.id, supplierName: supplierDTO.name });
    this.next();
  }

  onSubmit() {
    if (this.editMode && this.selectedProduct && this.selectedSku) {
      this.productService.updateProduct(this.selectedSku, this.productForm.value).subscribe(
        {next:(data)=>{
          window.location.reload();
        },
        error:(err)=>{
          alert(err);
        }
      }
      )
    }
    else {
    this.productService.addProduct(this.productForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  }
}
