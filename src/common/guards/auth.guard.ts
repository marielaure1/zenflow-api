import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authentication token');
    }

    const token = authHeader.split(' ')[1];

    console.log(token);
    

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request['user'] = decodedToken;

        // const handler = context.getHandler();
      // const roles = this.reflector.get<string[]>('roles', handler);
      // const requiresOwnership = this.reflector.get<boolean>('ownership', handler);

      // if (roles && !roles.includes(decodedToken.role)) {
      //   throw new UnauthorizedException('Insufficient role');
      // }

      // if (requiresOwnership && request.params.id && request['user'].uid !== request.params.id) {
      //   throw new UnauthorizedException('You do not own this resource');
      // }

      return true;
    } catch (error) {
      console.log("erro", error);
      
      throw new UnauthorizedException('Invalid token');
    }
  }
}
