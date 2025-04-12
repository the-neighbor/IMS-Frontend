import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifySupplierComponent } from './specify-supplier.component';

describe('SpecifySupplierComponent', () => {
  let component: SpecifySupplierComponent;
  let fixture: ComponentFixture<SpecifySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecifySupplierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecifySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
