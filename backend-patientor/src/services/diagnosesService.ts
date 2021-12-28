import diagnoses from '../../data/diagnosesTs';

import { DiagnosesEntry } from '../types';

const getDiagnoses = (): Array<DiagnosesEntry> => {
  return diagnoses;
}




const addDiagnoses = ( entry: DiagnosesEntry ): DiagnosesEntry => { 
  diagnoses.push(entry);
  return entry;
};



const findById = (code: string): DiagnosesEntry | undefined => {
  const patient = diagnoses.find(d => d.code === code);
  return patient;
};



export default {
  getDiagnoses,
  addDiagnoses ,
  findById
};