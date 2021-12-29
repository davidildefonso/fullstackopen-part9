import { State } from "./state";
import { Patient, Diagnosis,  NewEntryType } from "../types";

export type Action =
	| {
		type: "SET_PATIENT_LIST";
		payload: Patient[];
		}
	| {
		type: "ADD_PATIENT";
		payload: Patient;
		}
	| {
		type: "SET_DIAGNOSIS_LIST";
		payload: Diagnosis[];
		}
	| 	{
			type: "UPDATE_PATIENT_LIST";
			payload: Patient;
		}
	| 	{
			type: "ADD_DIAGNOSIS";
			payload: Diagnosis;
		}
	| {
			type: "ADD_ENTRY";
			payload: NewEntryType;
		}
	;


export const updatePatientInStore  = (data: Patient) : Action  => {
	return { type: "UPDATE_PATIENT_LIST", payload: data };
};


export const setPatientList  = (data: Patient[]) : Action  => {
	return { type: "SET_PATIENT_LIST", payload: data };
};


export const setDiagnosisList  = (data: Diagnosis[]) : Action  => {
	return { type: "SET_DIAGNOSIS_LIST", payload: data };
};

export const addDiagnosisToState = (data: Diagnosis) : Action => {
	return {type: "ADD_DIAGNOSIS", payload: data};
};


export const addNewPatient  = (data: Patient) : Action  => {
	return { type: "ADD_PATIENT", payload: data };
};


export const  addNewEntry = (data : NewEntryType ) : Action => {
	return { type: "ADD_ENTRY", payload: data };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
	case "UPDATE_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
	case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          [action.payload.code]: action.payload
        }
      };
	case "ADD_ENTRY":
		return {
			...state,
			patients: {
				...state.patients,
				[action.payload.id]: {
					...state.patients[action.payload.id],
					entries: state.patients[action.payload.id].entries?.concat(action.payload.entry)					
						
				}
			}
		};
    default:
      return state;
  }
};
