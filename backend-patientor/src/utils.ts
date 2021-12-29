import { NewPatientEntry, Gender, Fields, DiagnosesEntry, DiagnosesFields } from './types';

const toNewPatientEntry = (data: Fields): NewPatientEntry  => {

	const newEntry: NewPatientEntry = {
		name: parseName(data.name),
		dateOfBirth: parseDate(data.dateOfBirth),
		ssn: parseSsn(data.ssn),
		gender: parseGender(data.gender),
		occupation: parseOccupation(data.occupation),
		entries: parseEntries(data.entries)
	}	

	return newEntry;
}


const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


const isSsn = (param: any): param is string => {
  return /\d+-{0,1}\d+[a-zA-z]{0,1}/.test(param) 
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isSsn(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseEntries = (entries: unknown): any => {
//   if (!entries || !isGender(gender)) {
//       throw new Error('Incorrect or missing gender: ' + gender);
//   }
  return entries;
};


export const toNewDiagnosesEntry = (data: DiagnosesFields): DiagnosesEntry  => {

	const newEntry: DiagnosesEntry = {
		code: parseCode(data.code),
		name: parseNameDiagnoses(data.name),
		latin: parseLatin(data.latin)	
	}	

	return newEntry;
}

const parseCode = (code: unknown): string => {
  if (!code || !isCode(code)) {
    throw new Error('Incorrect or missing diagnoses code');
  }
  return code;
};

const isCode = (param: any): param is string => {
  return /[a-zA-z]{0,1}\d+\.\d+/.test(param) 
};

const parseNameDiagnoses = (diagnosesName: unknown): string => {
  if (!diagnosesName || !isString(diagnosesName)) {
    throw new Error('Incorrect or missing diagnoses name');
  }
  return diagnosesName;
};



const parseLatin = (latin: unknown): string => {
  if (!latin || !isString(latin)) {
    throw new Error('Incorrect  latin ');
  }
  return latin;
};



export default toNewPatientEntry;