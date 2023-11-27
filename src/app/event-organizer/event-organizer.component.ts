import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

interface EventFormData {
  eventName: string;
  eventOrganizerName:string;
  eventOrganizerEmail:string;
  area: string;
  city: string;
  zipcode: string;
  state: string;
  eventDate: Date | undefined;
  eventDescription: string;
}

@Component({
  selector: 'app-event-organizer',
  templateUrl: './event-organizer.component.html',
  styleUrls: ['./event-organizer.component.css']
})
export class EventOrganizerComponent {
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
    eventOrganizerEmail: ''
  };


  onSubmit() {
    const updateData = {

    }
    // Assuming your Node.js server is running on http://localhost:3000

    axios.post("http://localhost:4000/eventRegistration", this.eventData)
      .then(response => {
        this.eventState="success"
        console.log('Event created successfully:', response.data);
        // Handle success, e.g., show a success message to the user
      })
      .catch(error => {
        console.error('Error creating event:', error);
        // Handle error, e.g., show an error message to the user
      });
  }
}
