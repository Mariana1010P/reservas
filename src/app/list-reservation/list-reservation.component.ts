import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../model/reservation';
import { ReservationDataService } from '../reservationData/reservation-data.service';
import { Router } from '@angular/router';
import { SwalUtils } from '../utils/swal-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {

  @Input() reservationUpdated: EventEmitter<Reservation> = new EventEmitter<Reservation>();


  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationDataService, private router: Router) {
    this.loadReservationsFromLocalStorage()
  }

  ngOnInit() {
    this.reservations = this.reservationService.getReservation();
  }

  loadReservationsFromLocalStorage() {
    const reservationsJSON = localStorage.getItem('reservations');

    if (reservationsJSON) {
      this.reservations = JSON.parse(reservationsJSON);
    } else {
      this.reservations = [];
    }
  }


  onEditar(reserva: Reservation) {
    const reservationJSON = JSON.stringify(reserva);
    this.router.navigate(['edit-reservation', reserva.cedula], { state: { reservationJSON } });
    this.loadReservationsFromLocalStorage()
  }

  async onEliminar(reserva: Reservation) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    const result = await swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás deshacer esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        this.reservationService.eliminarReserva(reserva.cedula);

        await swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'La reserva ha sido eliminada.',
          'success'
        );

        this.reservations = this.reservationService.getReservation();
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        await swalWithBootstrapButtons.fire(
          'Error',
          'Se produjo un error al eliminar la reserva.',
          'error'
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire(
        'Cancelado',
        '¡La reserva está a salvo! :)',
        'error'
      );
    }
  }



}
