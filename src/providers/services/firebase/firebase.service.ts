import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { UpdateUserEmailDto } from '@modules/users/dto/update-user-email.dto';

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

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { email, password, status } = createUserDto;
      const userRecord = await admin.auth().createUser({
        email,
        password,
        emailVerified: status === 'Verified' || status === 'NotVerified' ? true : false,
        disabled: status !== 'Verified' && status !== 'NotVerified' ? false : true,
      });
      return userRecord;
    } catch (error) {
      console.error('Error creating user:', error);
      this.handleFirebaseError(error);
    }
  }

  async listUsers(maxResults: number = 1000, nextPageToken?: string) {
    try {
      const listUsersResult = await admin.auth().listUsers(maxResults, nextPageToken);
      return listUsersResult;
    } catch (error) {
      console.error('Error listing users:', error);
      this.handleFirebaseError(error);
    }
  }

  async getUser(uid: string) {
    try {
      const userRecord = await admin.auth().getUser(uid);
      return userRecord;
    } catch (error) {
      console.error('Error fetching user:', error);
      this.handleFirebaseError(error);
    }
  }

  async updateUser(uid: string, updateUserDto: UpdateUserDto) {
    try {
      const { email, password, status } = updateUserDto;
      const userRecord = await admin.auth().updateUser(uid, {
        email,
        password,
        emailVerified: status === 'Verified' || status === 'NotVerified' ? true : false,
        disabled: status !== 'Verified' && status !== 'NotVerified' ? false : true,
      });
      return userRecord;
    } catch (error) {
      console.error('Error updating user:', error);
      this.handleFirebaseError(error);
    }
  }
  
  async updateEmailUser(uid: string, updateUserEmailDto: UpdateUserEmailDto) {
    try {
      const { email } = updateUserEmailDto;
      const userRecord = await admin.auth().updateUser(uid, {
        email
      });
      return userRecord;
    } catch (error) {
      console.error('Error updating user email:', error);
      this.handleFirebaseError(error);
    }
  }

  async deleteUser(uid: string) {
    try {
      await admin.auth().deleteUser(uid);
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      this.handleFirebaseError(error);
    }
  }


 
  private handleFirebaseError(error: any) {
    switch (error.code) {
      case 'auth/email-already-exists':
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      case 'auth/invalid-email':
        throw new HttpException('Invalid email format', HttpStatus.BAD_REQUEST);
      case 'auth/operation-not-allowed':
        throw new HttpException('Operation not allowed', HttpStatus.FORBIDDEN);
      case 'auth/weak-password':
        throw new HttpException('Weak password', HttpStatus.BAD_REQUEST);
      case 'auth/user-not-found':
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      case 'auth/internal-error':
        throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR);
      default:
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
