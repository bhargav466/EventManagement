import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-update-venue',
  templateUrl: './update-venue.component.html',
  styleUrls: ['./update-venue.component.css']
})
export class UpdateVenueComponent implements OnInit {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.venue.venueName = params['venueName'] || '';
      this.venue.venueOwnerName = params['venueOwnerName'] || '';
      this.venue.venueOwnerEmail = params['venueOwnerEmail'] || '';
      this.venue.venueArea = params['venueArea'] || '';
      this.venue.venueZipcode = params['venueZipcode'] || '';
      this.venue.venueState = params['venueState'] || '';
      this.venue.venueCity = params['venueCity'] || '';
      this.venue.venueDescription = params['venueDescription'] || '';
      console.log(this.venue, 'Hello world');
    });
  }

  onSubmit() {
    const updateData = {
      venueName: this.venue.venueName,
      venueOwnerName: this.venue.venueOwnerName,
      venueOwnerEmail: this.venue.venueOwnerEmail,
      venueArea: this.venue.venueArea,
      venueZipcode: this.venue.venueZipcode,
      venueState: this.venue.venueState,
      venueCity: this.venue.venueCity,
      venueDescription: this.venue.venueDescription,
    };

    const venueOwnerEmail = this.venue.venueOwnerEmail;

    axios
      .patch(`http://localhost:4000/venueRegistration/${venueOwnerEmail}`, updateData)
      .then((response) => {
        console.log('Venue data updated successfully:', updateData);
        this.venueState = 'success';
        // Handle success as needed
      })
      .catch((error) => {
        console.error('Error while updating venue data:', error);
        // Handle error as needed
      });
  }
}
