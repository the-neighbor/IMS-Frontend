import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../../../models/interfaces/productDTO';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: ProductDTO = {} as ProductDTO;

  constructor() {
  }

}
