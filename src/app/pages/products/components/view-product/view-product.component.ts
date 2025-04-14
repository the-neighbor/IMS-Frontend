import { Component } from '@angular/core';
import { InventoryService } from '../../../../services/inventory.service';
import { AuthService } from '../../../../services/auth.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../../../../models/interfaces/productDTO';
import { InventoryDTO } from '../../../../models/interfaces/inventoryDTO';
import { CommonModule } from '@angular/common';
import { OrderDTO } from '../../../../models/interfaces/orderDTO';
import { OrdersService } from '../../../../services/orders.service';
import { SaleDTO } from '../../../../models/interfaces/saleDTO';
import { SalesService } from '../../../../services/sales.service';

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
  orders: OrderDTO[] = [] as OrderDTO[];
  sales: SaleDTO[] = [] as SaleDTO[];

  constructor(private authService:AuthService,private salesService:SalesService, private ordersService:OrdersService, private productService: ProductService, private inventoryService: InventoryService, private activatedRoute:ActivatedRoute) {
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
      this.getOrdersBySku(this.sku);
      this.getSalesBySku(this.sku);
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
  getSalesBySku(sku: number) {
    this.salesService.getSalesBySku(sku).subscribe((data) => {
      this.sales = data;
    });
  }


  getOrdersBySku(sku: number) {
    this.ordersService.getOrdersBySku(sku).subscribe((data) => {
      this.orders = data.filter(order => order.orderStatus === "PENDING");
      console.log(data);
      console.log(this.orders);
    });
  }

  profitMargin(product: ProductDTO) {
    return (product.sellPrice - product.buyPrice) / product.sellPrice;
  }

  profit(product: ProductDTO) {
    return product.sellPrice - product.buyPrice;
  }

  getProductQuantityFromOrder(sku: number, order: OrderDTO) {
    return order.productList?.find(product => product.sku === sku)?.quantity;
  }
  getProductQuantityFromSale(sku: number, sale: SaleDTO) {
    return sale.productList?.find(product => product.sku === sku)?.quantity;
  }


}
