import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Patient } from "./patient.model";

@Injectable()
export class PatientService {

  constructor(
    @InjectModel("Patient") private readonly patientModel: Model<Patient>
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

  async getPatient(id: number) {
    const patient = await this.findPatient(id);
    return {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      issue: patient.issue,
      charge: patient.charge,
      date: patient.date,
    };
  }

  async updatePatient(
    id: number,
    name: string,
    age: number,
    issue: string,
    charge: number
  ) {
    let patient = await this.findPatient(id);
    const newPatient = {
      id: patient.id,
      name,
      age,
      issue,
      charge,
      date: new Date(),
    };
    patient = this.setData(newPatient, patient);
    await patient.save();
  }

  async deletePatient(id: number) {
    await this.patientModel.deleteOne({_id:id}).exec()
  }

  private setData(newData, oldData: Patient) {
    if (newData.name) oldData.name = newData.name;
    if (newData.age) oldData.age = newData.age;
    if (newData.issue) oldData.issue = newData.issue;
    if (newData.charge) oldData.charge = newData.charge;
    return oldData;
  }
  private async findPatient(id: number): Promise<Patient> {
    let patient: Patient;
    try {
      patient = await this.patientModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find patient with the id ${id}`);
    }
    if (!patient) {
      throw new NotFoundException(`Could not find patient with the id ${id}`);
    }
    return patient;
  }
}
