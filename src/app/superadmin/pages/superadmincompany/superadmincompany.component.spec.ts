import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadmincompanyComponent } from './superadmincompany.component';

describe('SuperadmincompanyComponent', () => {
  let component: SuperadmincompanyComponent;
  let fixture: ComponentFixture<SuperadmincompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperadmincompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadmincompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
