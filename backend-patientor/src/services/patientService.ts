import patients from '../../data/patientsTs';

import { PatientsEntry ,  NonSensitivePatientsEntry} from '../types';

const getPatients = (): Array<PatientsEntry> => {
  return patients;
}

const getNonSensitivePatientsEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
	occupation
  }));
};


const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientsEntries,
  addPatient  
};