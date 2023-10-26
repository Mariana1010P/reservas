import { Injectable } from '@angular/core';
import { Reservation } from '../model/reservation';
@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {

  reservation: Reservation[] = [];

  constructor() {
    this.reservation = this.onInit();
  }

  onInit() {
    const reservasGuardadas = localStorage.getItem('reservas');
    return reservasGuardadas ? JSON.parse(reservasGuardadas) : [];
  }

  getReservation() {
    return this.reservation;
  }

  agregarReserva(reserva: Reservation) {
    this.reservation.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(this.reservation));
    console.log('pasa por servicio');
    
  }

  eliminarReserva(id: number) {
    const indice = this.reservation.findIndex((r) => r.cedula === id);
    if (indice !== -1) {
      this.reservation.splice(indice, 1);
      localStorage.setItem('reservas', JSON.stringify(this.reservation));
    }
  }

  editarReserva(cedula: number, reservaEditada: Reservation) {
    const indice = this.reservation.findIndex((r) => r.cedula === cedula);

    if (indice !== -1) {
      this.reservation[indice] = reservaEditada;
      localStorage.setItem('reservas', JSON.stringify(this.reservation));
    }
  }
}

