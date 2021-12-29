export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Array<Entry>;
}


export type TypeOptions =
  | "Hospital"
  | "OccupationalHealthcare"
  |  "HealthCheck"
  ;
 

export interface InitialEntryTypesForm {
	type: undefined	
	description: undefined;
	date: undefined;
	specialist: undefined;
	diagnosisCodes:undefined;
	healthCheckRating: undefined;
	discharge: undefined;
	sickLeave	: undefined;
	employerName: undefined;
}


export interface EntryBase{
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HospitalEntry extends EntryBase {
	type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
	date: string,
	criteria: string
}

export interface OccupationalHealthcareEntry extends EntryBase {
	type: "Hospital";
	discharge: Discharge;
 
}

interface SickLeave {
	startDate: string,
	endDate: string
}

export interface HealthCheckEntry extends EntryBase {
  type: "OccupationalHealthcare"; 
  sickLeave	: SickLeave;
  employerName: string;
}



export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntryType = {
	entry: Entry,
	id: string
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'> | undefined;