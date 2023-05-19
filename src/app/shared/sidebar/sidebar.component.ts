import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  public currentUser: Usuario;

  private subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router) {
      this.subscription.add(this.store.select('user').subscribe(({user}) => this.currentUser = user));
    }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
