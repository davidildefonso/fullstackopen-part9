import {Entry} from './types';

export const filterDiagnoses = (data: Entry[]) : Array<string> => {
	return data.reduce((acum :  Array<string> , entry: Entry)  => {
		if(entry  && entry.diagnosisCodes) return acum.concat(entry.diagnosisCodes);
		return acum;
	}  , []).filter((value, idx, arr) => (
				arr.findIndex((elm) => elm === value) === idx
	)) ;
};