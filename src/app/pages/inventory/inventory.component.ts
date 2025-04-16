import { Component } from '@angular/core';
import { InventoryDTO } from '../../models/interfaces/inventoryDTO';
import { InventoryService } from '../../services/inventory.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewAlertsComponent } from './view-alerts/view-alerts.component';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../models/interfaces/productDTO';
import { SuppliersService } from '../../services/suppliers.service';
import { SupplierDTO } from '../../models/interfaces/supplierDTO';
import { SaleDTO } from '../../models/interfaces/saleDTO';
import { SalesService } from '../../services/sales.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from "../../components/icon/icon.component";

interface tempDTO extends SaleDTO, InventoryDTO, ProductDTO, SupplierDTO {
  inPending: number;
  supplier: string
}

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, RouterLink, ViewAlertsComponent, ModalComponent, FormsModule, IconComponent],
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
  updatingQuantity: boolean = false;
  selectedSku: number = 0;
  selected : tempDTO = {} as tempDTO;

  set doneLoading(value: number) {
    this._doneLoading = value;
    if (this._doneLoading === 5) {
      this.doneLoadingAll = true;
      if (this.selectedSku) {
        this.onUpdate(this.selectedSku);
        console.log(this.selectedSku);
        console.log(this.combineAll(this.selectedSku));
      }
    }
  }
  get doneLoading(): number {
    return this._doneLoading;
  }
  _doneLoading: number = 0;
  doneLoadingAll: boolean = false;

  constructor(private auth:AuthService, private inventoryService:InventoryService, private salesService:SalesService, private productService:ProductService, private SuppliersService:SuppliersService, private activeRoute:ActivatedRoute) {
    this.inventoryService = inventoryService;
  }

  ngOnInit() {
    this.salesService.getSales().subscribe((data: SaleDTO[]) => {
      this.sales = data;
      this.doneLoading++;
    });
    this.SuppliersService.getSuppliers().subscribe((data: SupplierDTO[]) => {
      this.suppliers = data;
      this.doneLoading++;
    });
    this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      this.products = data;
      this.doneLoading++;
    }
    );
    this.inventoryService.getInventoryAlerts().subscribe((data: InventoryDTO[]) => {
      this.alerts = data;
      this.doneLoading++;
    });
    this.inventoryService.getInventory().subscribe((data: InventoryDTO[]) => {
      this.inventory = data;
      this.doneLoading++;
      // this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      //   this.products = data;
      //   this.inventory.forEach((inv) => {
      //     const product = this.products.find((p) => p.sku === inv.sku);
      //     if (product) {
      //       this.inventoryProducts.push({ ...product, ...inv });
      //     }
      //   });
      // });
    });
      this.activeRoute.queryParams.subscribe(params => {
        console.log(params);
        this.selectedSku = Number(params['sku']);
   });
  
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

  updateQuantity(sku: number, quantity: number) {
    this.inventoryService.updateInventory(sku, {sku:sku, quantity:quantity}).subscribe((data: InventoryDTO) => {
      window.location.reload();
    }
    );
  }

  onUpdate(sku: number) {
    this.updatingQuantity = true;
    console.log(sku);
    this.selected = this.combineAll(sku) as tempDTO;

  }
  cancelUpdate() {
    this.updatingQuantity = false;
    this.selected = {} as tempDTO;
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
