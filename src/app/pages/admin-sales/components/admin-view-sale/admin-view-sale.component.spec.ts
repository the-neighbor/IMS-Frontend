import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewSaleComponent } from './admin-view-sale.component';

describe('AdminViewSaleComponent', () => {
  let component: AdminViewSaleComponent;
  let fixture: ComponentFixture<AdminViewSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
