export type Gender = 'male' | 'female' | 'not specified' ;

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender?: Gender;
  occupation?: string;
}


export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}


export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

