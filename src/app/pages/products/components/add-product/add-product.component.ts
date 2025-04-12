import { Component, Input } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDTO } from '../../../../models/interfaces/productDTO';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, ReactiveFormsModule],
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
    sellPrice: new FormControl(0)
  });
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
