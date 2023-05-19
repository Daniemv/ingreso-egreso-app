import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;
  type = 'ingreso';

  loading = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  public save() {

    if (this.ingresoEgresoForm.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    const { description, amount } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(description, amount, this.type);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(response => {
      Swal.fire('Registro creado', description, 'success');
      this.ingresoEgresoForm.reset();
      this.store.dispatch(stopLoading());
    }).catch(error => {
      Swal.fire('Error', error.message, 'error');
      this.store.dispatch(stopLoading());
    });
  }

  private initForm() {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
