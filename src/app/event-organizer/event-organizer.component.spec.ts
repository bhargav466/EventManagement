import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizerComponent } from './event-organizer.component';

describe('EventOrganizerComponent', () => {
  let component: EventOrganizerComponent;
  let fixture: ComponentFixture<EventOrganizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventOrganizerComponent]
    });
    fixture = TestBed.createComponent(EventOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
