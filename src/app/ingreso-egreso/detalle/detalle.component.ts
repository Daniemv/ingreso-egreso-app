import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  public ingresoEgresoCollection: IngresoEgreso[] = [];

  private ingresoEgresoSubscription = new Subscription();

  constructor(
    private store: Store<AppStateWithIngresoEgreso>,
    private ingresoEgresoService: IngresoEgresoService) { }


  ngOnInit(): void {
    this.ingresoEgresoSubscription.add(this.store.select('ingresosEgresos').subscribe(({ items }) => this.ingresoEgresoCollection = [...items]));
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  public borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Éxito', 'Item borrado correctamente', 'success');
      }).catch(error => Swal.fire('Error', error.message, 'error')
    );
  }

}
