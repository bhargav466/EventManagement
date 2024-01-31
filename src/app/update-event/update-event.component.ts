import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent {
  eventState: string | null = null;
  eventData: EventFormData = {
    eventName: '',
    area: '',
    city: '',
    zipcode: '',
    state: '',
    eventDate: undefined,
    eventDescription: '',
    eventOrganizerName: '',
    eventOrganizerEmail: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // console.log("params",params['eventOrganizerEmail'])
      (this.eventData.eventName = params['eventName']),
        (this.eventData.eventOrganizerEmail = params['eventOrganizerEmail']);
      (this.eventData.eventOrganizerName = params['eventOrganizerName']),
        (this.eventData.area = params['area']),
        (this.eventData.city = params['city']),
        (this.eventData.zipcode = params['zipcode']),
        (this.eventData.state = params['state']),
        (this.eventData.eventDate = params['eventDate']),
        (this.eventData.eventDescription = params['eventDescription']);
        // console.log('Event Organizer Data:', this.eventData);
    });
  }

  async onSubmit() {
    // Create an object with the fields you want to update
    const updateEventData = {
      eventName: this.eventData.eventName,
      area: this.eventData.area,
      city: this.eventData.city,
      zipcode: this.eventData.zipcode,
      state: this.eventData.state,
      eventDate: this.eventData.eventDate,
      eventDescription: this.eventData.eventDescription,
      eventOrganizerName: this.eventData.eventOrganizerName,
      eventOrganizerEmail: this.eventData.eventOrganizerEmail,
    };

    const eventOrganizerEmail = this.eventData.eventOrganizerEmail;
    try {
      const response = await axios.patch(
        `http://localhost:4000/eventRegistration/${eventOrganizerEmail}`,
        updateEventData
      );
      console.log('Event data updated successfully:', response);
      this.eventState = 'success';
    } catch (error) {
      console.error('Error while updating event data:', error);
    }
  }
}
