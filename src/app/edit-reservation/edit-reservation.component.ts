import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../model/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalUtils } from '../utils/swal-utils';
import { ReservationDataService } from '../reservationData/reservation-data.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  @Input() reservation!: Reservation;
  @Output() onSave: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  cedula: string = ''

  constructor(private route: ActivatedRoute, private router: Router, private reservationService: ReservationDataService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cedula = params['cedula'];
    });
  
    const navigationState = history.state;
    if (navigationState && navigationState.reservationJSON) {
      this.reservation = JSON.parse(navigationState.reservationJSON);
    }
  
    console.log(this.cedula);
    console.log(this.reservation);

  }

  updateReservation() {
    // Llama al servicio para editar la reserva
    if (this.reservation) {
      this.reservationService.editarReserva(this.reservation.cedula, this.reservation);
      SwalUtils.customMessageOk('Ok','Reserva actualizada')
      this.onSave.emit(this.reservation); 
      this.router.navigateByUrl('/list-reservation')
    }else{
      console.log('no');
      
    }
  }
  
}
