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

import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
  }

  initAuthListerer() {
    onAuthStateChanged(this.auth, (user: any) => {
      console.log(user);
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
