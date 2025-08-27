import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouthportWebDesignComponent } from './southport-web-design.component';

describe('SouthportWebDesignComponent', () => {
  let component: SouthportWebDesignComponent;
  let fixture: ComponentFixture<SouthportWebDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SouthportWebDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouthportWebDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
