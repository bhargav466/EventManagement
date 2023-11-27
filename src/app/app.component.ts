import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'mean-test';
  name = new FormControl('');
  
  // ViewEventHandler() {
  //   axios.get("http://localhost:4000/userRegistration")
  // .then(res => {
  //   // Handle the response data here
  //   console.log(res.data,"data from the bacend")
  // })
  // .catch(error => {
  //   // Handle any errors here
  //   console.error("Error while fetching user registration data:", error);
  // });

  // }
  
}

