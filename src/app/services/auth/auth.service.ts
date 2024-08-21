import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  async signUp(email: string, password: string) {
    try {
      // Try to create a new user
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        // If the email is already in use, log the user in instead
        return this.signIn(email, password);
      } else {
        // If it's another error, throw it
        throw error;
      }
    }
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  getUser() {
    return this.auth.currentUser;
  }
}
