
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

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
	date: string,
	criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface SickLeave {
	startDate: string,
	endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave	: SickLeave;
  employerName: string
}

export type TypeOptions =
  | "Hospital"
  | "OccupationalHealthcare"
  |  "HealthCheck";
 



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

export interface VisitFields { 
	type: unknown;
	description: unknown;
	date: unknown;
	specialist: unknown;
	diagnosisCodes: unknown;
	healthCheckRating: unknown;
	discharge: unknown;
	sickLeave: unknown;
	employerName: unknown;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'> | undefined;