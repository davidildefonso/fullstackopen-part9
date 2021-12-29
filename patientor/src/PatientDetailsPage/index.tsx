import React, { useEffect, useState} from "react";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {updatePatientInStore} from '../state/reducer';


const PatientDetailsPage = () => {
	const [{ patients }, dispatch] = useStateValue();
	const [patient , setPatient] = useState({} as Patient);
	const { id } = useParams<{ id: string }>();
	
	useEffect(() => {		
		const patientDataInState : Patient | undefined = Object.values(patients).find(patient => patient.id === id) as Patient;
		
		const fetchPatient = async () => {
			try {
				const { data: patientData } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`
				);
				setPatient(patientData);
				dispatch(updatePatientInStore(patientData));
			} catch (e) {
				console.error(e);
			}
		};

		if(patientDataInState.ssn){		
			setPatient(patientDataInState);
		}else{	
			void fetchPatient();
		}
	

	}, [dispatch]);
  
	if(!patient) return null;

	return (
		<>
			<h1>{patient.name} <Icon name={patient.gender === "male" ? "mars" : patient.gender === "female" ? "venus" : "neuter"  } /> </h1>
			<p>ssn: {patient.ssn} </p>
			<p>occupation:  {patient.occupation} </p>
		</>	
	);
};

export default PatientDetailsPage;
