import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/list-reservation', pathMatch:'full'
  },{
    path:'list-reservation',component:ListReservationComponent
  },
  {
    path:'add-reservation', component:AddReservationComponent
  },
  {
    path:'edit-reservation/:cedula', component:EditReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
