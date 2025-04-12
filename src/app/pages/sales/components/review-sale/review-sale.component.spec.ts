import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSaleComponent } from './review-sale.component';

describe('ReviewSaleComponent', () => {
  let component: ReviewSaleComponent;
  let fixture: ComponentFixture<ReviewSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
