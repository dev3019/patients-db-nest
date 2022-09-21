import * as mongoose from 'mongoose';

export const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  issue: { type: String, required: true },
  charge: { type: Number, required: true },
  date: { type: Date, required: true },
});

export interface Patient extends mongoose.Document{
  id: number;
  name: string;
  age: number;
  issue: string;
  charge: number;
  date: Date;
}
