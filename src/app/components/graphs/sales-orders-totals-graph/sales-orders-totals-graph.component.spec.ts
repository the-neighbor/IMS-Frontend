import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrdersTotalsGraphComponent } from './sales-orders-totals-graph.component';

describe('SalesOrdersTotalsGraphComponent', () => {
  let component: SalesOrdersTotalsGraphComponent;
  let fixture: ComponentFixture<SalesOrdersTotalsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrdersTotalsGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrdersTotalsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
