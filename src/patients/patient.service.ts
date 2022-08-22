import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { Patient } from './patient.model';

@Injectable()
export class PatientService {
  patients: Patient[] = []; //initialize as empty array

  constructor(
    @InjectModel('Patient') private readonly patientModel: Model<Patient>,
  ) {}

  async inserPatient(name: string, age: number, issue: string, charge: number) {
    const newPatient = new this.patientModel({
      name,
      age,
      issue,
      charge,
      date: new Date(),
    });
    const result = await newPatient.save();
    return result.id as number;
  }

  async getPatients() {
    const patients = await this.patientModel.find().exec();
    return patients.map((patient) => ({
      id: patient.id,
      name: patient.name,
      age: patient.age,
      issue: patient.issue,
      patient: patient.charge,
      date: patient.date,
    }));
  }

  getPatient(id: number) {
    const [patient] = this.findPatient(id);
    return { ...patient };
  }

  updatePatient(
    id: number,
    name: string,
    age: number,
    issue: string,
    charge: number,
  ) {
    const [patient, patientIndex] = this.findPatient(id);
    let newPatient = {
      id: patientIndex + 1,
      name,
      age,
      issue,
      charge,
      date: new Date(),
    };
    newPatient = this.setData(newPatient, patient);
    this.patients[patientIndex] = newPatient;
  }

  deletePatient(id: number) {
    const patientIndex = this.findPatient(id)[1];
    this.patients.splice(patientIndex, 1);
  }

  private setData(newData, oldData) {
    if (!newData.name) newData.name = oldData.name;
    if (!newData.age) newData.age = oldData.age;
    if (!newData.issue) newData.issue = oldData.issue;
    if (!newData.charge) newData.charge = oldData.charge;
    return newData;
  }
  private findPatient(id: number): [Patient, number] {
    const patientIndex = this.patients.findIndex((pati) => pati.id == id);
    const patient = this.patients[patientIndex];
    if (!patient) {
      throw new NotFoundException(`Could not find patient with the id ${id}`);
    }
    return [patient, patientIndex];
  }
}
