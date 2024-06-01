// // auth.middleware.ts
// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request, Response, NextFunction } from 'express';
// import { FirebaseService } from '@providers/services/firebase/firebase.service';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(
//     private readonly firebaseService: FirebaseService,
//     private readonly reflector: Reflector
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Missing or invalid authentication token');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const decodedToken = await this.firebaseService.verifyToken(token);
//       req['user'] = decodedToken;

//       const roles = this.reflector.get<string[]>('roles', req.handler);
//       const requiresOwnership = this.reflector.get<boolean>('ownership', req.handler);

//       if (roles && !roles.includes(decodedToken.role)) {
//         throw new UnauthorizedException('Insufficient role');
//       }

//       if (requiresOwnership && req.params.id && req['user'].uid !== req.params.id) {
//         throw new UnauthorizedException('You do not own this resource');
//       }

//       next();
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }
