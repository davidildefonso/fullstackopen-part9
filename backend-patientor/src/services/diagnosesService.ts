import diagnoses from '../../data/diagnosesTs';

import { DiagnosesEntry } from '../types';

const getDiagnoses = (): Array<DiagnosesEntry> => {
  return diagnoses;
}


const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses  
};