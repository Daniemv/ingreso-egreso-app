import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public ingresoCount = 0;
  public egresoCount = 0;

  public totalIngresos = 0;
  public totalEgresos = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';


  private subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.subscription.add(this.store.select('ingresosEgresos').subscribe(({ items }) => this.generarEstadistica(items)));
  }

  ngOnInit(): void {
  }

  generarEstadistica(items: IngresoEgreso[]) {

    this.ingresoCount = 0;
    this.egresoCount = 0;
    this.totalEgresos = 0;
    this.totalEgresos = 0;

    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIngresos += Number.parseFloat(item.amount);
        this.ingresoCount++;
      } else {
        this.totalEgresos += Number.parseFloat(item.amount);
        this.egresoCount++;
      }
    }
    this.doughnutChartData.datasets = [
      { data: [this.totalIngresos, this.totalEgresos] }
    ];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
