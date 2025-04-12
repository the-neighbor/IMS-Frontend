import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSaleComponent } from './place-sale.component';

describe('PlaceSaleComponent', () => {
  let component: PlaceSaleComponent;
  let fixture: ComponentFixture<PlaceSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
