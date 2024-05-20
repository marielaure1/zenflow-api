import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('users')
  async getUsers() {
    const auth = this.firebaseService.getAuth();
    const users = await auth.listUsers();
    return users;
  }

  @Get('data')
  async getData() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await firestore.collection('your-collection').get();
    return snapshot.docs.map(doc => doc.data());
  }

  @Post()
  async register(@Body() createUserDto :CreateUserDto, @Res() res: Response){
    const { email, password } = createUserDto;

    console.log(email);
    
    const firestore = this.firebaseService.createUser(email, password);
    console.log("firestore ",firestore);
    
    return firestore;
  }
}
