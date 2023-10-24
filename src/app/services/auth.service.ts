import { getFirestore } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubcription!: Subscription; // sirve para destruir la subscripcion, pero en mi caso no funcionó.

  constructor(private auth: Auth, private store: Store<AppState>) {
  }

  initAuthListerer() {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user){
        const tempUser = new Usuario(user.uid, 'Miguel Viteri', user.email);
        this.store.dispatch(authActions.setUser({user: tempUser}));
      }else {
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  //NO FUNCIONÓ.
  // crearUsuario(nombre: string, email: string, password: string) {
  //   return createUserWithEmailAndPassword(this.auth, email, password)
  //     .then(({ user }) => {
  //       const newUser = new Usuario(user.uid, nombre, email);
  //       return this.fireStore.doc(`${user.uid}/usuario`).set({ ...newUser });
  //     });
  // }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return onAuthStateChanged(this.auth, (user: any) => {
      return user !== null ? true : false;
    });
  }
}
