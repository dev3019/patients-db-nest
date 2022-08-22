import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Patient } from './patient.model';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Post()
  async addPatient(
    // @Body() completeBody: {name: string, age:string, issue: string, charge: string}
    @Body('name') name: string,
    @Body('age') age: number,
    @Body('issue') issue: string,
    @Body('charge') charge: number,
  ) {
    const geneId = await this.patientService.inserPatient(
      name,
      age,
      issue,
      charge,
    );
    return { generatedId: geneId };
  }

  @Get('getList')
  async getPatients() {
    const patients = await this.patientService.getPatients();
    return patients;
  }
  @Get(':id')
  getPatient(@Param('id') id: number) {
    return this.patientService.getPatient(id);
  }

  @Patch(':id')
  updatePatient(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('age') age: number,
    @Body('issue') issue: string,
    @Body('charge') charge: number,
  ) {
    this.patientService.updatePatient(id, name, age, issue, charge);
    return null;
  }

  @Delete(':id')
  deletePatient(@Param('id') id: number) {
    this.patientService.deletePatient(id);
    return null;
  }
}
