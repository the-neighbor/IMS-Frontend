import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleComponent } from './view-sale.component';

describe('ViewSaleComponent', () => {
  let component: ViewSaleComponent;
  let fixture: ComponentFixture<ViewSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
