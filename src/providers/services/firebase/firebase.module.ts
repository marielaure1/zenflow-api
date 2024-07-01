// // src/modules/firebase/firebase.module.ts
// import { Module, Global, DynamicModule } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { FirebaseService } from '@providers/services/firebase/firebase.service';
// import settings from '@constants/settings';
// import { UsersModule } from '@modules/users/users.module';
// import { UsersService } from '@modules/users/users.service';

// @Global()
// @Module({
//   imports: [ConfigModule, UsersModule],
//   providers: [FirebaseService, UsersService],
//   exports: [FirebaseService],
// })
// export class FirebaseModule {

  
//   static forRootAsync(): DynamicModule {
//     return {
//       module: FirebaseModule,
//       imports: [ConfigModule],
//       providers: [
//         {
//           provide: 'FIREBASE_ADMIN',
//           useFactory: async (configService: ConfigService) => {
//             return admin.initializeApp({
//               credential: admin.credential.cert(JSON.parse(settings.FIREBASE_SERVICE_ACCOUNT)),
//               databaseURL: settings.FIREBASE_DATABASE_URL,
//             });
//           },
//           inject: [ConfigService],
//         },
//       ],
//       exports: ['FIREBASE_ADMIN'],
//     };
//   }
// }
