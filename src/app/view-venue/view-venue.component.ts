import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

interface VenueFormData {
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
  selector: 'app-view-venue',
  templateUrl: './view-venue.component.html',
  styleUrls: ['./view-venue.component.css']
})
export class ViewVenueComponent implements OnInit {
  venueData: VenueFormData[] = [];

  constructor(private router: Router) {}
  
  ngOnInit() {
    this.fetchVenueData();
  }

  async fetchVenueData() {
    try {
      const response = await axios.get<VenueFormData[]>("http://localhost:4000/venueRegistration");
      this.venueData = response.data;
    } catch (err) {
      console.error("Error while fetching all the venues", err);
    }
  }

  updateVenue(venue: VenueFormData) {
    console.log(venue, 'what\'s happening here');
    this.router.navigate(['/updatevenue'], {
      queryParams: {
        venueName: venue.venueName,
        venueOwnerName: venue.venueOwnerName,
        venueOwnerEmail: venue.venueOwnerEmail,
        venueArea: venue.venueArea,
        venueZipcode: venue.venueZipcode,
        venueState: venue.venueState,
        venueCity: venue.venueCity,
        venueDescription: venue.venueDescription,
      }
    });
  }

  async deleteVenue(venue: VenueFormData) {
    console.log(venue.venueOwnerEmail);
    try {
      await axios.delete(`http://localhost:4000/venueRegistration/${venue.venueOwnerEmail}`);
      console.log("Venue deleted successfully" , venue);

      // After deleting, update venue data
      this.fetchVenueData();
    } catch (err) {
      console.error("Error while deleting the venue", err);
    }
  }
}
