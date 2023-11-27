import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventOrganizerComponent } from './event-organizer/event-organizer.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserComponent } from './user/user.component';
import { VenueComponent } from './venue/venue.component';
import { UpdateVenueComponent } from './update-venue/update-venue.component';
import { ViewVenueComponent } from './view-venue/view-venue.component';

const routes: Routes = [
  // {path:'',component:NavbarComponent},
  {path:'user',component:UserComponent},
  {path:'addevent',component:EventOrganizerComponent},
  {path:'addvenue',component:VenueComponent},
  {path:'viewUsers',component:TableComponent},
  {path:"updateuser",component:UpdateUserComponent},
  {path:"home",component:HomeComponent},
  {path:"updateevent",component:UpdateEventComponent},
  {path:"updatevenue",component:UpdateVenueComponent},
  {path:"viewallvenues",component:ViewVenueComponent}

  // {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
