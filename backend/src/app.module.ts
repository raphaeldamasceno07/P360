import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '26032020',
      port: Number(process.env.DB_PORT) || 5432,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     // useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
