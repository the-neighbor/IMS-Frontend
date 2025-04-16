import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProductsGraphComponent } from './sales-products-graph.component';

describe('SalesProductsGraphComponent', () => {
  let component: SalesProductsGraphComponent;
  let fixture: ComponentFixture<SalesProductsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesProductsGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesProductsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
