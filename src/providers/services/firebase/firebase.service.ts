import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  getAuth() {
    return this.firebaseAdmin.auth();
  }

  getFirestore() {
    return this.firebaseAdmin.firestore();
  }

  getMessaging() {
    return this.firebaseAdmin.messaging();
  }

  async createUser(email: string, password: string) {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      return userRecord.uid;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

}
