import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { VenueDataService } from './../venue-data.service';

interface UserData {
  userName: string;
  userDob: string;
  userEmail: string;
  userMobile: string;
  userAddress: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  totalData: UserData[] = [];
  eventId: String = '';

  constructor(
    private venueDataService: VenueDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.venueDataService.dataChanged.subscribe((data: any[]) => {
      this.totalData = data;
    });

    this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];
      // If eventId is not part of route parameters, adjust accordingly
    });
     if (this.eventId) {
      this.fetchData();
    }
  }

  async fetchData() {
    try {
      const eventID = this.eventId;

      const response = await axios.get(
        `http://localhost:4000/userRegistration/${eventID}`
      );
      const data = response.data;
      this.totalData = data;
    } catch (error) {
      console.error('Error while fetching user registration data:', error);
    }
  }

  updateUser(user: any) {
    this.router.navigate(['/updateuser'], {
      queryParams: {
        userName: user.userName,
        userEmail: user.userEmail,
        userMobile: user.userMobile,
        userAddress: user.userAddress,
        userDob: user.userDob,
        eventId:user.eventId
      },
    });
  }

  async deleteUser(user: any) {
    const eventId = user.eventId;
    await axios
      .delete(`http://localhost:4000/userRegistration/${user.userEmail}`)
      .then((res) => {
        console.log('user deleted successfully',user);
        axios
          .get(`http://localhost:4000/userRegistration/${eventId}`)
          .then((res) => {
            const data = res.data;
            this.totalData = data;
          })
          .catch((error) => {
            console.error(
              'Error while fetching user registration data after deletion:',
              error
            );
          });
      })
      .catch((error) => {
        console.error('Error while deleting user data:', error);
        // Handle errors, e.g., show an error message to the user
      });
  }
}
