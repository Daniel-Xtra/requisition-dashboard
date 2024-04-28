import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRequisitionComponent } from './single-requisition.component';

describe('SingleRequisitionComponent', () => {
  let component: SingleRequisitionComponent;
  let fixture: ComponentFixture<SingleRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleRequisitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
