import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventOrganizerComponent } from './event-organizer/event-organizer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TableComponent } from './table/table.component';
import { UserComponent } from './user/user.component';
import { VenueDataService } from './venue-data.service';
import { VenueComponent } from './venue/venue.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateVenueComponent } from './update-venue/update-venue.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { ViewVenueComponent } from './view-venue/view-venue.component';

@NgModule({
  declarations: [
    AppComponent,
    EventOrganizerComponent,
    VenueComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    TableComponent,
    NavbarComponent,
    NotfoundComponent,
    UpdateUserComponent,
    UpdateVenueComponent,
    UpdateEventComponent,
    ViewVenueComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [VenueDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
