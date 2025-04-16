import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTimeComponent } from './product-time.component';

describe('ProductTimeComponent', () => {
  let component: ProductTimeComponent;
  let fixture: ComponentFixture<ProductTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
