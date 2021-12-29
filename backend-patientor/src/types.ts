
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
  
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnosesEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
	date: string,
	criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
	startDate: string,
	endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave	: SickLeave;
  employerName: string
}



export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


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