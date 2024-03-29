import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEventComponent } from './manager-event.component';

describe('ManagerEventComponent', () => {
  let component: ManagerEventComponent;
  let fixture: ComponentFixture<ManagerEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
