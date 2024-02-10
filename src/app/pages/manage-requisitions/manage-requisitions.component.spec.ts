import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequisitionsComponent } from './manage-requisitions.component';

describe('ManageRequisitionsComponent', () => {
  let component: ManageRequisitionsComponent;
  let fixture: ComponentFixture<ManageRequisitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRequisitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRequisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
