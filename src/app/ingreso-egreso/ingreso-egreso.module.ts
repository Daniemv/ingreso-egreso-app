import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoPipe } from '../shared/pipes/orden-ingreso.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashbordRoutingModule } from '../dashboard/dashbord-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    DashboardComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
    SharedModule,
    DashbordRoutingModule
  ],
  exports: [
    IngresoEgresoComponent,
    DashboardComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ]
})
export class IngresoEgresoModule { }
