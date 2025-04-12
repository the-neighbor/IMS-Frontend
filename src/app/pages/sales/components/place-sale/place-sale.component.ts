import { Component } from '@angular/core';
import { ChooseItemsComponent } from "../choose-items/choose-items.component";
import { SpecifyQuantityComponent } from '../specify-quantity/specify-quantity.component';
import { SpecifySupplierComponent } from '../specify-supplier/specify-supplier.component';
import { SaleProductDTO } from '../../../../models/interfaces/saleProductDTO';
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { ProductService } from '../../../../services/product.service';
import { SaleDTO } from '../../../../models/interfaces/saleDTO';
import { ReviewSaleComponent } from '../review-sale/review-sale.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-place-sale',
  imports: [ChooseItemsComponent, SpecifyQuantityComponent, SpecifySupplierComponent,ReviewSaleComponent],
  templateUrl: './place-sale.component.html',
  styleUrl: './place-sale.component.css'
})
export class PlaceSaleComponent {

  phase = 0;
  products: {selected: boolean, product: ProductDTO}[] = [];
  selectedProducts: SaleProductDTO[] = [];
  finalSale: SaleDTO = {} as SaleDTO;  

  constructor(private productService: ProductService, private auth :AuthService) {
    this.productService = productService;
    this.auth = auth;
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      this.products = data.map((item) => ({ selected: false, product: item }));
    });
    this.finalSale.customerUsername = this.auth.getUsername() || '';
  }
  onProductsSelected(products: ProductDTO[]) {
    this.selectedProducts = products.map(
      (product) => ({ ...product, quantity: 0 })
    );
    this.phase = 1;
  }
  onQuantitySelected(products: SaleProductDTO[]) {
    this.selectedProducts = products;
    this.phase = 2;
    this.finalSale = {
      saleId: '',
      customerUsername: this.auth.getUsername() || '',
      totalPrice: this.selectedProducts.reduce((acc, curr) => acc + (curr.sellPrice * curr.quantity), 0),
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
