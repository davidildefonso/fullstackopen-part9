
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
  
}

export interface Entry {
	content: string
}


export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender?: Gender;
  occupation?: string;
  entries: Array<Entry>;
}


export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown , entries: unknown};

export type DiagnosesFields = { code: unknown, name: unknown, latin: unknown};