import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSubscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubscription.add(
      this.store
        .select('user')
        .pipe(filter((auth) => auth.user !== null))
        .subscribe(({ user }) => {
          this.userSubscription.add(
            this.ingresoEgresoService
              .initIngresosEgresosListener(user.uid)
              .subscribe((ingresosEgresosFB) =>
                this.store.dispatch(setItems({ items: ingresosEgresosFB }))
              )
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
