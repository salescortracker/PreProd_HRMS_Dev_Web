import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadmindepartmentComponent } from './superadmindepartment.component';

describe('SuperadmindepartmentComponent', () => {
  let component: SuperadmindepartmentComponent;
  let fixture: ComponentFixture<SuperadmindepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperadmindepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadmindepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
