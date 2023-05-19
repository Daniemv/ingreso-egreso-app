import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService) { }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(map(snapshot => snapshot.map(document => ({
        uid: document.payload.doc.id,
        ...document.payload.doc.data() as IngresoEgreso
      })
      )));
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${this.authService.currentUser.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  borrarIngresoEgreso(ingresoEgresoUid: string) {
    return this.firestore.doc(`${this.authService.currentUser.uid}/ingresos-egresos/items/${ingresoEgresoUid}`)
      .delete()
  }
}
