import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbyWebDesignComponent } from './formby-web-design.component';

describe('FormbyWebDesignComponent', () => {
  let component: FormbyWebDesignComponent;
  let fixture: ComponentFixture<FormbyWebDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormbyWebDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormbyWebDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
