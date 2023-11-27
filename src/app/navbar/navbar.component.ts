import { Component } from '@angular/core';
import axios from 'axios';
import { VenueDataService } from './../venue-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private venueDataService: VenueDataService) {}

  ViewEventHandler() {
    axios.get("http://localhost:4000/userRegistration")
      .then(res => {
        const data = res.data;
        this.venueDataService.setTotalVenuesData(data);
      })
      .catch(error => {
        console.error("Error while fetching user registration data:", error);
      });
  }
}
