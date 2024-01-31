import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

interface EventFormData {
  eventName: string;
  _id: string;
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

  async viewInfoButton(event: EventFormData) {
    var eventID: String = event._id;
    console.log(typeof eventID);
    try {
      const response = await axios.get<EventFormData[]>(
        `http://localhost:4000/userRegistration/${eventID}`
      );
      console.log(response.data);
    } catch (err) {
      console.error('Error while fetching all the events', err);
    }
  }

  async deleteEvent(event: EventFormData) {
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

  openGoogleMaps(event: EventFormData) {
    const address = `${event.area}, ${event.city}, ${event.zipcode}, ${event.state}`;

    console.log('Address:', address);

    this.getLatLngFromAddress(address).then((latLng) => {
      console.log('Latitude and Longitude:', latLng);

      if (latLng) {
        window.open(
          `https://www.google.com/maps?q=${latLng.lat},${latLng.lng}`,
          '_blank'
        );
      } else {
        console.warn(
          'Unable to get latitude and longitude from the provided address.'
        );
      }
    });
  }

  async getLatLngFromAddress(
    address: string
  ): Promise<{ lat: number; lng: number } | null> {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyBKNh_cCI7VSvPL3JQMZpFTI2Z7KNeuB1g`
      );

      console.log('Geocoding API Response:', response.data);

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.warn('No results found for the provided address.');
        return null;
      }
    } catch (err) {
      console.error(
        'Error while fetching latitude and longitude from the address',
        err
      );
      return null;
    }
  }
}
