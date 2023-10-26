import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationDataService } from './reservationData/reservation-data.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    AddReservationComponent,
    EditReservationComponent,
    ListReservationComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
