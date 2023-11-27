import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {
  totalData: UserData[] = [];

  constructor(private venueDataService: VenueDataService, private router: Router) {
     
  }

  ngOnInit() {
    this.fetchData();
    this.venueDataService.dataChanged.subscribe((data: any[]) => {
      this.totalData = data;
    });
  }

  async fetchData() {
      axios.get("http://localhost:4000/userRegistration")
        .then(res => {
          const data = res.data;
          this.totalData = data;
        })
        .catch(error => {
          console.error("Error while fetching user registration data:", error);
        });
    
  }

  updateUser(user: any) {
    this.router.navigate(['/updateuser'], {
      queryParams: {
        userName: user.userName,
        userEmail: user.userEmail,
        userMobile: user.userMobile,
        userAddress: user.userAddress,
        userDob: user.userDob
      }
    });
  }

  async deleteUser (user: any) {
     await axios.delete(`http://localhost:4000/userRegistration/${user.userEmail}`)
  .then((res) => {
    
    console.log(user,"deleted data is");
     axios.get("http://localhost:4000/userRegistration")
    .then(res => {
      const data = res.data;
      this.totalData=data
    })
    .catch(error => {
      console.error("Error while fetching user registration data after deletion:", error);
    });
  })
  .catch((error) => {
    console.error("Error while deleting user data:", error);
    // Handle errors, e.g., show an error message to the user
  });
  }
}
