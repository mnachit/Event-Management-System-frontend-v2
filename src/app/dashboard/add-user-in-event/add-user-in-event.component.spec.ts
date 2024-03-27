import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInEventComponent } from './add-user-in-event.component';

describe('AddUserInEventComponent', () => {
  let component: AddUserInEventComponent;
  let fixture: ComponentFixture<AddUserInEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserInEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserInEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
