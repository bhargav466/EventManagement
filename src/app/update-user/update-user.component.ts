import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  userState: string | null = null;
  formData: {
    userName: string;
    userEmail: string;
    userMobile: string;
    userDob: string;
    userAddress: string;
    eventId: String;
  } = {
    userName: '',
    userEmail: '',
    userMobile: '',
    userDob: '',
    userAddress: '',
    eventId: '',
  };

  userEmail: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.formData.userName = params['userName'] || '';
      this.formData.userEmail = params['userEmail'] || '';
      this.formData.userMobile = params['userMobile'] || '';
      this.formData.userAddress = params['userAddress'] || '';
      this.formData.userDob = params['userDob'] || '';
      this.formData.eventId = params['eventId'];
      this.userEmail = params['userEmail'] || ''
    });
  }

  async onSubmit() {
    const updateData = {
      userName: this.formData.userName,
      userEmail: this.formData.userEmail,
      userMobile: this.formData.userMobile,
      userAddress: this.formData.userAddress,
      userDob: this.formData.userDob,
    };

    await axios
      .patch(`http://localhost:4000/userRegistration/${this.userEmail}`, updateData)
      .then((response) => {
        console.log('User data updated successfully:', response.data);
        this.userState = 'success';
      })
      .catch((error) => {
        console.error('Error while updating user data:', error);
      });
  }
}
