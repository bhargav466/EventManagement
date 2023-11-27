import { Component } from '@angular/core';
import axios from 'axios';

interface Venue {
  venueName: string;
  venueOwnerName: string;
  venueOwnerEmail: string;
  venueArea: string;
  venueZipcode: string;
  venueState: string;
  venueCity: string;
  venueDescription: string;
}

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css'],
})
export class VenueComponent {
  venueState: null | String = null;
  venue: Venue = {
    venueName: '',
    venueOwnerName: '',
    venueOwnerEmail: '',
    venueArea: '',
    venueZipcode: '',
    venueState: '',
    venueCity: '',
    venueDescription: '',
  };
  async onSubmit() {
    console.log(this.venue, 'om bhim bhush');
    await axios
      .post('http://localhost:4000/venueRegistration', this.venue)
      .then((res) => {
        console.log('Venue successfully created ', res);
        this.venueState = 'success';
      })
      .catch((err) => {
        console.log('Error while creating a venue', err);
      });
  }
}
