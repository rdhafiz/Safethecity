// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private firestore: Firestore) {
    this.user$ = afAuth.authState;
  }

  async register(username: string, telegramId: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, { username, telegramId }, { merge: true });
    }
  }

  async login(username: string, telegramId:string): Promise<void> {
    // Use a dummy password to authenticate
    const dummyPassword = 'dummyPassword';
    const userCredential = await this.afAuth.signInWithEmailAndPassword(telegramId, dummyPassword);
    if (userCredential.user) {
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(this.firestore, `users/${userCredential.user.uid}`));
      if (!userDoc.exists()) {
        // Register if not found
        await this.register(username, telegramId);
      }
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.user$;
  }
}
