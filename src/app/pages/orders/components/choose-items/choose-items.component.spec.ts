import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseItemsComponent } from './choose-items.component';

describe('ChooseItemsComponent', () => {
  let component: ChooseItemsComponent;
  let fixture: ComponentFixture<ChooseItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
