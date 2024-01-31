import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userState: string | null = null;
  formData: {
    userName: string;
    userDob: string;
    userEmail: string;
    userMobile: string;
    userAddress: string;
    eventId: String;
  } = {
    userName: '',
    userDob: '',
    userEmail: '',
    userMobile: '',
    userAddress: '',
    eventId: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formData.eventId = params['eventId'];
    });
  }

  async onSubmit() {
    

    await axios
      .post('http://localhost:4000/userRegistration', this.formData)
      .then((data) => {
        console.log('Data Posetd successfully in the server', data);
        this.userState = 'success';
      })
      .catch((err) => {
        console.log('Error occured in posting user data : ', err);
      });
    //  axios.post(apiUrl, this.formData)
    //    .then(response => {
    //      // Handle the response from the server, e.g., show a success message.
    //      console.log('Post success:', response.data);
    //    })
    //    .catch(error => {
    //      // Handle errors, e.g., show an error message.
    //      console.error('Post error:', error);
    //    });
  }
}
