import { Component } from '@angular/core';
import { ChooseItemsComponent } from "../choose-items/choose-items.component";
import { SpecifyQuantityComponent } from '../specify-quantity/specify-quantity.component';
import { SpecifySupplierComponent } from '../specify-supplier/specify-supplier.component';
import { OrderProductDTO } from '../../../../models/interfaces/orderProductDTO';
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { ProductService } from '../../../../services/product.service';
import { OrderDTO } from '../../../../models/interfaces/orderDTO';
import { ReviewOrderComponent } from '../review-order/review-order.component';

@Component({
  selector: 'app-place-order',
  imports: [ChooseItemsComponent, SpecifyQuantityComponent, SpecifySupplierComponent,ReviewOrderComponent],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {

  phase = 0;
  products: {selected: boolean, product: ProductDTO}[] = [];
  selectedProducts: OrderProductDTO[] = [];
  selectedSupplier: SupplierDTO = {} as SupplierDTO;
  finalOrder: OrderDTO = {} as OrderDTO;  

  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      this.products = data.map((item) => ({ selected: false, product: item }));
    });
  }
  onProductsSelected(products: ProductDTO[]) {
    this.selectedProducts = products.map(
      (product) => ({ ...product, quantity: 0 })
    );
    this.phase = 2;
  }
  onSupplierSelected(supplier: SupplierDTO) {
    this.selectedSupplier = supplier;
    this.phase = 1;
  }
  onQuantitySelected(products: OrderProductDTO[]) {
    this.selectedProducts = products;
    this.phase = 3;
    this.finalOrder = {
      orderId: '',
      supplier: this.selectedSupplier,
      totalPrice: this.selectedProducts.reduce((acc, curr) => acc + (curr.buyPrice * curr.quantity), 0),
      productList: this.selectedProducts
    };
  }
  back(){
    if (this.phase === 1) {
      this.phase = 0;
    } else if (this.phase === 2) {
      this.phase = 1;
    } else if (this.phase === 3) {
      this.phase = 2;
    }
  }
}
