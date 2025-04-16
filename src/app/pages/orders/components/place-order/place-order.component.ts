import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChooseItemsComponent } from "../choose-items/choose-items.component";
import { SpecifyQuantityComponent } from '../specify-quantity/specify-quantity.component';
import { SpecifySupplierComponent } from '../specify-supplier/specify-supplier.component';
import { OrderProductDTO } from '../../../../models/interfaces/orderProductDTO';
import { SupplierDTO } from '../../../../models/interfaces/supplierDTO';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { ProductService } from '../../../../services/product.service';
import { OrderDTO } from '../../../../models/interfaces/orderDTO';
import { ReviewOrderComponent } from '../review-order/review-order.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../components/icon/icon.component';

@Component({
  selector: 'app-place-order',
  imports: [ChooseItemsComponent, SpecifyQuantityComponent, SpecifySupplierComponent,ReviewOrderComponent, CommonModule, ModalComponent, IconComponent],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {


  @Input() showModalValue: boolean = false;
  @Input() set showModal(value: boolean) {
    if (!value && this.showModalValue) {
      this.close();
    }
    this.showModalValue = value;
    if (value) {
      this.phase = 0;
    }
  }
  get showModal(): boolean {
    return this.showModalValue;
  }

  @Input() updateMode: boolean = false;
  @Input() selectedOrder: OrderDTO = {} as OrderDTO;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitOrder = new EventEmitter<OrderDTO>();
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

  close(){
    this.phase = 0;
    this.selectedProducts = [];
    this.selectedSupplier = {} as SupplierDTO;
    this.finalOrder = {} as OrderDTO;
    console.log(this.showModal);
    this.closeModal.emit();
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
