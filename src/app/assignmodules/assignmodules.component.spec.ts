import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmodulesComponent } from './assignmodules.component';

describe('AssignmodulesComponent', () => {
  let component: AssignmodulesComponent;
  let fixture: ComponentFixture<AssignmodulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmodulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
