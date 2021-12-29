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

