import { Component,OnInit } from '@angular/core';
import axios from 'axios';

interface Venue {
  _id: string;
  venueName: string;
  // Add other venue properties as needed
}

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
  venue: Venue | null;
}



@Component({
  selector: 'app-event-organizer',
  templateUrl: './event-organizer.component.html',
  styleUrls: ['./event-organizer.component.css'],
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
    eventOrganizerEmail: '',
    venue:null
  };

  
  venues?: Venue[] = [];
  showVenueList: boolean = false;
 

  ngOnInit() {
    this.fetchVenues();
  }


  fetchVenues() {
    axios.get<Venue[]>('http://localhost:4000/venueRegistration').then((response) => {
      this.venues = response.data;
    }).catch((error) => {
      console.error('Error fetching venues:', error);
    });
  }

  toggleVenueList() {
    this.showVenueList = !this.showVenueList;
  }
  
  onSelectVenue(venue: Venue) {
    // Handle the selected venue
    this.eventData.venue = venue;
    
  }

  getVenueName(): string {
    return this.eventData.venue?.venueName ?? '';
  }


  onSubmit() {
    const updateData = {};
    // Assuming your Node.js server is running on http://localhost:3000

    axios
      .post('http://localhost:4000/eventRegistration', this.eventData)
      .then((response) => {
        this.eventState = 'success';
        console.log('Event created successfully:', response.data);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        // Handle error, e.g., show an error message to the user
      });
  }
}
