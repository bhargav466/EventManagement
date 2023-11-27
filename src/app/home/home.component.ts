import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

interface EventFormData {
  eventName: string;
  eventOrganizerName: string;
  eventOrganizerEmail: string;
  area: string;
  city: string;
  zipcode: string;
  state: string;
  eventDate: Date | undefined;
  eventDescription: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  eventData: EventFormData[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchEventData();
  }

  async fetchEventData() {
    try {
      const response = await axios.get<EventFormData[]>(
        'http://localhost:4000/eventRegistration'
      );
      this.eventData = response.data;
    } catch (err) {
      console.error('Error while fetching all the events', err);
    }
  }

  updateEvent(event: EventFormData) {
    this.router.navigate(['/updateevent'], {
      queryParams: {
        eventName: event.eventName,
        area: event.area,
        city: event.city,
        zipcode: event.zipcode,
        state: event.state,
        eventDate: event.eventDate,
        eventDescription: event.eventDescription,
        eventOrganizerName: event.eventOrganizerName,
        eventOrganizerEmail: event.eventOrganizerEmail,
      },
    });
  }

  async deleteEvent(event: EventFormData) {
    console.log(event.eventOrganizerEmail);
    try {
      await axios.delete(
        `http://localhost:4000/eventRegistration/${event.eventOrganizerEmail}`
      );
      console.log('Event deleted successfully', event);

      // After deleting we need to update event data
      this.fetchEventData();
    } catch (err) {
      console.error('Error while deleting the event', err);
    }
  }
}
