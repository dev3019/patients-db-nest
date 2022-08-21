import moment from 'moment';

export class Patient {
  date: Date;
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public issue: string,
    public charge: number,
  ) {
    this.date = new Date();
  }
}
