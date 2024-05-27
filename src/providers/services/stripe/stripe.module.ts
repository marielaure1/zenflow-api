import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // rend la configuration globalement accessible dans toute l'application
      envFilePath: '.env', // chemin vers le fichier .env contenant les variables d'environnement
    }),
  ],
  controllers: [],
  providers: []
})
export class StripeModule {}
