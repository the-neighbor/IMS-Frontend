import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { ProductService } from '../../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-items',
  imports: [FormsModule, CommonModule],
  templateUrl: './choose-items.component.html',
  styleUrl: './choose-items.component.css'
})
export class ChooseItemsComponent {

  @Input() products: {selected: boolean, product: ProductDTO}[] = [];
  @Output() productsSelected = new EventEmitter<ProductDTO[]>();

  constructor(private productService:ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      this.products = data.map((item) => ({ selected: false, product: item }));
    });
  }

  onSubmit() {
    this.productsSelected.emit(this.products.filter((item) => item.selected).map((item) => item.product));
  }
  

}
