import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { CrearUsuarioInterface } from '../interfaces/crear-usuario.interface';
import { LoginInterface } from '../interfaces/login.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { setUser, unsetUser } from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription();
  private _currentUser: Usuario;

  get currentUser() {
    return {...this._currentUser};
  }

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/usuario`).valueChanges()
        .subscribe((user: any) => {
          const usuario = Usuario.fromFirestore(user);
          this._currentUser = usuario;
          this.store.dispatch(setUser({user: usuario}));
        });
      } else {
        // No existe
        this._currentUser = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(unsetUser());
        this.store.dispatch(unSetItems());
      }
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
