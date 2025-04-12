import { Component } from '@angular/core';
import { InventoryService } from '../../../../services/inventory.service';
import { AuthService } from '../../../../services/auth.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { InventoryDTO } from '../../../../models/interfaces/inventoryDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {

  product: ProductDTO = {} as ProductDTO;
  sku: number = 0;
  inventory: InventoryDTO = {} as InventoryDTO;

  constructor(private authService:AuthService, private productService: ProductService, private inventoryService: InventoryService, private activatedRoute:ActivatedRoute) {
    this.authService = authService;
    this.productService = productService;
    this.inventoryService = inventoryService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.sku = params['sku'];
      this.getProductBySku(this.sku);
      this.getInventoryBySku(this.sku);
    });
  }
  getProductBySku(sku: number) {
    this.productService.getProductBySku(sku).subscribe((data) => {
      this.product = data;
    });
  }
  getInventoryBySku(sku: number) {
    this.inventoryService.getInventoryBySku(sku).subscribe((data) => {
      this.inventory = data;
    });
  }
  profitMargin(product: ProductDTO) {
    return (product.sellPrice - product.buyPrice) / product.sellPrice;
  }

  profit(product: ProductDTO) {
    return product.sellPrice - product.buyPrice;
  }


}
