import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth-customer.dto';
import { UpdateAuthDto } from './dto/update-auth-customer.dto';
// import * as admin from 'firebase-admin';

@Injectable()
export class AuthService 
{
  // async register(email: string, password: string) {
  //   try {
  //     const userRecord = await admin.auth().createUser({
  //       email,
  //       password,
  //     });
  //     return userRecord.uid;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw error;
  //   }
  // }
}
