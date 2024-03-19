import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetaitsComponent } from './event-detaits.component';

describe('EventDetaitsComponent', () => {
  let component: EventDetaitsComponent;
  let fixture: ComponentFixture<EventDetaitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetaitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventDetaitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
