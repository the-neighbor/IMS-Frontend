import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyQuantityComponent } from './specify-quantity.component';

describe('SpecifyQuantityComponent', () => {
  let component: SpecifyQuantityComponent;
  let fixture: ComponentFixture<SpecifyQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecifyQuantityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecifyQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
