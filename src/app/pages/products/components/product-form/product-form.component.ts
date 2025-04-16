import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {


  @Input() productForm : FormGroup | undefined;
  @Output() productInfoEntered = new EventEmitter<void>();
  @Input() categories: string[] = [
    'Electronics',
  'Fashion & Apparel',
  'Home & Living',
  'Beauty & Wellness',
  'Toys & Games'
  ];

  onSubmit() {
    this.productInfoEntered.emit();
  }
}
