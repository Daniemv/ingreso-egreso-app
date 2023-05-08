import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrearUsuarioInterface } from 'src/app/interfaces/crear-usuario.interface';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm!: FormGroup;
  loading = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  get user() {
    return this.registerForm.get('user');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  ngOnInit(): void {
    this.initForm();
    this.uiSubscription = this.store.select('ui').subscribe((ui) => this.loading = ui.isLoading);
  }

  public createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(isLoading());
    /* Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    }); */
    const nuevoUsuario: CrearUsuarioInterface = {
      user: this.user?.value,
      email: this.email?.value,
      password: this.password?.value
    };
    this.authService.crearUsuario(nuevoUsuario)
      .then(response => {
        this.store.dispatch(stopLoading());
        //Swal.close();
        this.router.navigate(['/']);
      }).catch(error => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      })
  }

  private initForm() {
    this.registerForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
