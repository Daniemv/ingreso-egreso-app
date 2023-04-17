import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { CrearUsuarioInterface } from '../interfaces/crear-usuario.interface';
import { LoginInterface } from '../interfaces/login.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      console.log('firebaseUser: ', firebaseUser);
    });
  }

  crearUsuario(nuevoUsuario: CrearUsuarioInterface) {
    return this.auth.createUserWithEmailAndPassword(nuevoUsuario.email, nuevoUsuario.password)
            .then(firebaseUser => {
              const newUser = new Usuario(firebaseUser.user?.uid ?? '', nuevoUsuario.user, nuevoUsuario.email);
              return this.firestore.doc(`${newUser.uid}/usuario`).set({...newUser});
            });
  }

  loginUsuario(login: LoginInterface) {
    return this.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(firebaseUser => firebaseUser !== null));
  }
}
