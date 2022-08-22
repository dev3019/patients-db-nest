import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patients/patient.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PatientModule,
    MongooseModule.forRoot(
      'mongodb+srv://div_api-practice:google11@cluster0.r99se.gcp.mongodb.net/patients-db?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
