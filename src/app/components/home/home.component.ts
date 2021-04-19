import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/ClienteModel';
import { ClienteService } from 'src/app/services/clienteService'

import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertBody } from 'src/app/models/AlertBody';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registrando = false
  loading: boolean
  alert: AlertBody
  
  todayDate: Date = new Date();
  minDate: Date = new Date();
  closeResult: string;

  clientes: Cliente[] = []

  newCliente: Cliente = {
    nombre: "",
    apellido: "",
    edad: 0,
    fecha_nacimiento: ""
  }

  constructor(
    private modalService: NgbModal,
    private service: ClienteService
  ) {
    this.loading = true;
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);

    this.service.getListaClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data
        this.loading = false
      }, err => {
        this.alert = { type: 'danger', message: err.error.msj }
        this.loading = false
      }
    )
  }

  ngOnInit(): void { }

  registrarCliente(form: NgForm) {
    if ( form.invalid ) {
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });

      return;
    }
    
    let body: Cliente = {
      nombre: form.value.nombre.trim(),
      apellido: form.value.apellido.trim(),
      fecha_nacimiento: form.value.fechaNac.trim()
    }

    this.registrando = true
    this.modalService.dismissAll()
    this.service.crearCliente(body).subscribe(
      (data: any) => {
        this.clientes.unshift(data.cliente);
        this.alert = { type: 'success', message: data.msj }
        this.registrando = false
      }, err => {
        this.alert = { type: 'danger', message: err.error.msj }
        this.registrando = false
      }
    )
  }

  calcularEdad(fechaNac) {
    if (fechaNac == undefined || fechaNac == "") {
      return "Ingrese la fecha de nacimiento"
    }
    
    var ageDifMs = Date.now() - Date.parse(fechaNac);
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }
    
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}