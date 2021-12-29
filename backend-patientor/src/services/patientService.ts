import patients from '../../data/patientsTs';

import { PatientsEntry , NewPatientEntry,  NonSensitivePatientsEntry} from '../types';

const getPatients = (): Array<PatientsEntry> => {
  return patients;
}

const getNonSensitivePatientsEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
	occupation,
	entries
  }));
};



const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
  const newPatientEntry = {
    id: new Date().toISOString(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};



const findById = (id: string): PatientsEntry | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};


export default {
  getPatients,
  getNonSensitivePatientsEntries,
  addPatient,
  findById 
};