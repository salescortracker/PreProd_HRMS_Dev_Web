import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminuserComponent } from './superadminuser.component';

describe('SuperadminuserComponent', () => {
  let component: SuperadminuserComponent;
  let fixture: ComponentFixture<SuperadminuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperadminuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
