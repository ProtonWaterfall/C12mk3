import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiverpoolWebDesignComponent } from './liverpool-web-design.component';

describe('LiverpoolWebDesignComponent', () => {
  let component: LiverpoolWebDesignComponent;
  let fixture: ComponentFixture<LiverpoolWebDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiverpoolWebDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiverpoolWebDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
