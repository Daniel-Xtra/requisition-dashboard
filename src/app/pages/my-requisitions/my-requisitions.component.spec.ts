import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequisitionsComponent } from './my-requisitions.component';

describe('MyRequisitionsComponent', () => {
  let component: MyRequisitionsComponent;
  let fixture: ComponentFixture<MyRequisitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRequisitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRequisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
