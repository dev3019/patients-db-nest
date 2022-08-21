import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.model';

@Injectable()
export class PatientService {
  patients: Patient[] = []; //initialize as empty array

  inserPatient(name: string, age: number, issue: string, charge: number) {
    const pId = this.patients.length + 1;
    const newPatient = new Patient(pId, name, age, issue, charge);
    this.patients.push(newPatient);
    return pId;
  }

  getPatients() {
    return [...this.patients];
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
