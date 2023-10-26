export class Reservation {
    map(arg0: (reservation: { cedula: number; }) => { cedula: number; }) {
      throw new Error('Method not implemented.');
    }
    cedula: number = 0;
    nombre: string = ""
    apellidos: string = ""
    email: string = ""
    tipoCliente: string = ""
    fechaLlegada: Date
    fechaSalida: Date

    constructor() {
        this.fechaSalida = new Date();
        this.fechaLlegada = new Date();
    }
}