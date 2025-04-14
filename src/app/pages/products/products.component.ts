import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from "./components/add-product/add-product.component";
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../models/interfaces/productDTO';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from "../../components/icon/icon.component";
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [AddProductComponent, CommonModule, RouterLink, RouterLinkActive, IconComponent, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  viewGrid: boolean = true;

  constructor(private auth:AuthService, private productService:ProductService) {
    this.productService = productService;
  }
  products: ProductDTO[] = [];

  selectedProduct: ProductDTO | undefined;

  editMode: boolean = false;
  addEditModalOpen: boolean = false;

  openModal() {
    this.addEditModalOpen = true;
  }
  closeModal() {
    this.addEditModalOpen = false;
    this.selectedProduct = undefined;
    this.editMode = false;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: ProductDTO[]) => {
      this.products = data;
    });
  }
  selectProduct(index: number){
    this.selectedProduct = this.products[index];
    console.log(this.selectedProduct)
  }
  onUpdate(sku: number) {
    this.editMode = true;
    this.selectProduct(this.products.findIndex((p)=>{return p.sku === sku}));
    this.openModal();

  }
  onDelete(sku:number) {
    this.productService.deleteProduct(sku).subscribe((data:ProductDTO)=>{
      window.location.reload();
    });
  }
  isAdmin() {
    return this.auth.isAdmin();
  }
  isStaff() {
    return this.auth.isStaff();
  }
  isUser() {
    return this.auth.isUser();
  }
}
