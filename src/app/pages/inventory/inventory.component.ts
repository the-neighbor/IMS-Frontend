import { Component } from '@angular/core';
import { InventoryDTO } from '../../models/interfaces/inventoryDTO';
import { InventoryService } from '../../services/inventory.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViewAlertsComponent } from './view-alerts/view-alerts.component';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../models/interfaces/productDTO';
import { SuppliersService } from '../../services/suppliers.service';
import { SupplierDTO } from '../../models/interfaces/supplierDTO';
import { SaleDTO } from '../../models/interfaces/saleDTO';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, RouterLink, ViewAlertsComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  alerts: InventoryDTO[] = [];
  inventory: InventoryDTO[] = [];
  products: ProductDTO[] = [];
  suppliers: SupplierDTO[] = [];
  sales: SaleDTO[] = [];
  viewingAlerts : boolean = false;

  constructor(private auth:AuthService, private inventoryService:InventoryService, private salesService:SalesService, private productService:ProductService, private SuppliersService:SuppliersService) {
    this.inventoryService = inventoryService;
  }

  ngOnInit() {
    this.salesService.getSales().subscribe((data: SaleDTO[]) => {
      this.sales = data;
    });
    this.SuppliersService.getSuppliers().subscribe((data: SupplierDTO[]) => {
      this.suppliers = data;
    });
    this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      this.products = data;
    }
    );
    this.inventoryService.getInventoryAlerts().subscribe((data: InventoryDTO[]) => {
      this.alerts = data;
    });
    this.inventoryService.getInventory().subscribe((data: InventoryDTO[]) => {
      this.inventory = data;
      // this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      //   this.products = data;
      //   this.inventory.forEach((inv) => {
      //     const product = this.products.find((p) => p.sku === inv.sku);
      //     if (product) {
      //       this.inventoryProducts.push({ ...product, ...inv });
      //     }
      //   });
      // });
    }
    );
  }
  viewAlerts() {
    this.viewingAlerts = true;
  }
  viewInventory() {
    this.viewingAlerts = false;
  }
  findNameBySku(sku: number) {
    const product = this.products.find(product => product.sku === sku);
    return product ? product.name : 'Unknown Product';
  }
  findProductBySku(sku: number) {
    return this.products.find(product => product.sku === sku);
  }
  findPriceBySku(sku: number) {
    const product = this.findProductBySku(sku);
    return product ? product.sellPrice : 0;
  }
  findBuyPriceBySku(sku: number) {
    const product = this.findProductBySku(sku);
    return product ? product.buyPrice : 0;
  }

  combineAll(sku: number) {
    const product = this.findProductBySku(sku);
    const inventory = this.inventory.find(inv => inv.sku === sku);
    const supplier = this.suppliers.find(sup => sup.id === product?.supplierId);
    const sales = this.sales.filter(sale => sale.productList?.find(p => p.sku === sku));
    const numberInPending = sales.filter(sale => sale.saleStatus === 'PENDING').reduce((acc, sale) => {
      const productsInSale = sale.productList?.filter(p => p.sku === sku).reduce((acc, p) => {
        return acc + p.quantity;
      }, 0);
      return acc + (productsInSale ? productsInSale : 0);
    }, 0);
    return { ...product, ...inventory, supplier:supplier?.name, inPending:numberInPending };
  }
  combineAllForAll()
  {
    const combined = this.inventory.map(inv => {
      const product = this.findProductBySku(inv.sku);
      const supplier = this.suppliers.find(sup => sup.id === product?.supplierId);
    const sales = this.sales.filter(sale => sale.productList?.find(p => p.sku === inv.sku));
    const numberInPending = sales.filter(sale => sale.saleStatus === 'PENDING').reduce((acc, sale) => {
      const productsInSale = sale.productList?.filter(p => p.sku === inv.sku).reduce((acc, p) => {
        return acc + p.quantity;
      }, 0);
      return acc + (productsInSale ? productsInSale : 0);
    }, 0);
      return { ...product, ...inv, supplier:supplier?.name, inPending:numberInPending };
    });
    return combined;
  }
}
