import { Component, OnInit } from '@angular/core';
import { AlertBody } from 'src/app/models/AlertBody';
import { Kpi } from 'src/app/models/EstadisticaModel';
import { ClienteService } from 'src/app/services/clienteService';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  kpi: Kpi
  alert: AlertBody
  loading: boolean

  constructor(
    private service: ClienteService
  ) {
    this.loading = true;
    this.service.getKpiClientes().subscribe(
      (data: Kpi) => {
        this.kpi = data
        this.loading = false
      }, err => {
        this.alert = { type: 'danger', message: err.error.msj }
        this.loading = false
      }
    )
  }

  ngOnInit(): void {
  }

}
