import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInfoComponent } from './apps-info.component';

describe('AppsInfoComponent', () => {
  let component: AppsInfoComponent;
  let fixture: ComponentFixture<AppsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
