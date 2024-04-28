import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRequisitionsComponent } from './review-requisitions.component';

describe('ReviewRequisitionsComponent', () => {
  let component: ReviewRequisitionsComponent;
  let fixture: ComponentFixture<ReviewRequisitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewRequisitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewRequisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
