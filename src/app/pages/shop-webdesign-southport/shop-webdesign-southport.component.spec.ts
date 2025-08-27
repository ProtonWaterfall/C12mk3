import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWebdesignSouthportComponent } from './shop-webdesign-southport.component';

describe('ShopWebdesignSouthportComponent', () => {
  let component: ShopWebdesignSouthportComponent;
  let fixture: ComponentFixture<ShopWebdesignSouthportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopWebdesignSouthportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopWebdesignSouthportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
