import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaoLakComponent } from './khao-lak.component';

describe('KhaoLakComponent', () => {
  let component: KhaoLakComponent;
  let fixture: ComponentFixture<KhaoLakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhaoLakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhaoLakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
