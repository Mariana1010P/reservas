import { Component, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalUtils } from '../utils/swal-utils';
import { ReservationDataService } from '../reservationData/reservation-data.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  reservationForm!: FormGroup
  reservation: Reservation = new Reservation();


  constructor(private fb: FormBuilder, private reservationService: ReservationDataService) {
  }

  ngOnInit() {
    this.reservationForm = this.iniciarFormulario()
  }

  iniciarFormulario(): FormGroup {
    return this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoCliente: ['', Validators.required],
      fechaLlegada: [new Date(), Validators.required],
      fechaSalida: [new Date(), Validators.required],
    })
  }


  saveReservation() {
    if (this.reservationForm.valid) {
      this.extractData()
      const nuevaReserva: Reservation = this.reservationForm.value;
      this.reservationService.agregarReserva(nuevaReserva);
      
      SwalUtils.customMessageOk('OK', 'Se agrego correctamente')
      localStorage.setItem('reservation', JSON.stringify(nuevaReserva));
      this.reservationForm.reset();
    } else {
      SwalUtils.customMessageError('Error', 'No se puede')
    }
  }

  extractData() {
    this.reservation.cedula = this.reservationForm.get("cedula")?.value
    this.reservation.nombre = this.reservationForm.get("nombre")?.value
    this.reservation.apellidos = this.reservationForm.get("apellidos")?.value
    this.reservation.email = this.reservationForm.get("email")?.value
    this.reservation.tipoCliente = this.reservationForm.get("tipoCliente")?.value
    this.reservation.fechaLlegada = this.reservationForm.get("fechaLlegada")?.value
    this.reservation.fechaSalida = this.reservationForm.get("fechaSalida")?.value
  }
}

