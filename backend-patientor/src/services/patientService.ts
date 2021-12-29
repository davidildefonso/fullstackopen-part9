import patients from '../../data/patientsTs';

import { PatientsEntry , NewPatientEntry,   NonSensitivePatientsEntry, Entry} from '../types';

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

const addPatientEntry = ( { patientId, newEntry} : any   ): Entry => {
  const newVisitEntry: Entry = {    
	id: new Date().toISOString(),
    ...newEntry	
  };

  patients.map( p => p.id === patientId 
  	? {...p, entries: p.entries.push(newVisitEntry) } 
	: p);
   
  return newVisitEntry;
};






const findById = (id: string): PatientsEntry | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};


export default {
  getPatients,
  getNonSensitivePatientsEntries,
  addPatient,
  findById ,
  addPatientEntry
};