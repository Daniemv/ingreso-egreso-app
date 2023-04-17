import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrearUsuarioInterface } from 'src/app/interfaces/crear-usuario.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

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
  }

  public createUser() {
    if (this.registerForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const nuevoUsuario: CrearUsuarioInterface = {
      user: this.user?.value,
      email: this.email?.value,
      password: this.password?.value
    };
    this.authService.crearUsuario(nuevoUsuario)
      .then(response => {
        Swal.close();
        this.router.navigate(['/']);
      }).catch(error => {
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

}
