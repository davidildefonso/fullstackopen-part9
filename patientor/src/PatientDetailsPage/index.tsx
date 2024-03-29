import React, { useEffect, useState} from "react";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import {  Diagnosis, Patient, Entry } from '../types';
import { Icon } from 'semantic-ui-react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {updatePatientInStore, addDiagnosisToState, addNewEntry} from '../state/reducer';
import { filterDiagnoses } from "../utils";
import {  Button } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage = () => {
	const [{ patients, diagnoses }, dispatch] = useStateValue();
	const [patient , setPatient] = useState({} as Patient);
	const { id } = useParams<{ id: string }>();  
	
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

  

	useEffect(() => {		
		const patientDataInState : Patient | undefined = Object.values(patients).find(patient => patient.id === id) as Patient;
		
		const fetchPatient = async () => {
			try {
				const { data: patientData } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`
				);
				setPatient(patientData);
				dispatch(updatePatientInStore(patientData));

				if(patientData.entries){
					const patientsDiagnoses = filterDiagnoses(patientData.entries);
					patientsDiagnoses.map( async d => {
						if(!Object.keys(diagnoses).includes(d)){
							const { data: diagnosisDetails } = await axios.get<Diagnosis>(
								`${apiBaseUrl}/diagnoses/${d}`
							);						
							dispatch(addDiagnosisToState(diagnosisDetails));
						}					
					});					
				}
				
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


	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const { data: newEntry } = await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addNewEntry({id, entry: newEntry}));
			closeModal();
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {

				console.error('Unknown Error');
				setError('Unknown error');
				// console.error(e.response?.data || 'Unknown Error');
				// setError(e.response?.data?.error || 'Unknown error');
			}else{
				console.error('Unknown Error');
				setError('Unknown error');
			} 
		
		}
	};
  
	if(!patient) return null;


	const getDiagnosisName = (code: string) => {
		const found = diagnoses && Object.values(diagnoses).find(d => d.code === code);
		if(found) return found.name;
		return null;
	}; 


	const showDetails = (entry: Entry) => {
		console.log(entry);
		
		switch (entry.type) {
			case "HealthCheck":		
				const color =   entry.healthCheckRating === 0 ? "black" : entry.healthCheckRating === 1 ? "yellow" : "red";		
				return 	<div style={{margin: "3rem 0"}} key={entry.id}>
							<h3> {entry.type} <Icon name="doctor" /> </h3>
							<p>{entry.date} {entry.description} </p>
							<p>specialist: {entry.specialist} </p>
							<p>health rating: {entry.healthCheckRating } 
								<Icon style={{color}} name="heart"/> </p>												
						</div>;		
			case "Hospital":			
				return 	<div style={{margin: "3rem 0"}} key={entry.id}>
							<h3> {entry.type} <Icon name="hospital symbol"/> </h3>
							<p>{entry.date} {entry.description} </p>
							<p>specialist: {entry.specialist} </p>
							<p>discharge date: {entry.discharge.date } </p>
							<p>discharge criteria: {entry.discharge.criteria} </p>
							<p>diagnoses codes:</p>
							{entry?.diagnosisCodes?.map(dc => 
								<p key = {dc}> <span> {dc} : {getDiagnosisName(dc)} </span> </p>
							)}
						</div>;	
			case "OccupationalHealthcare":			
				return 	<div style={{margin: "3rem 0"}} key={entry.id}>
							<h3> {entry.type}  <Icon name="grab"/></h3>
							<p>{entry.date} {entry.description} </p>
							<p>specialist: {entry.specialist} </p>
							<p>sick leave: {entry.sickLeave && entry.sickLeave.startDate} -  {entry.sickLeave && entry.sickLeave.endDate}</p>
							<p>employeer: {entry.employerName}  </p>
							{entry?.diagnosisCodes?.map(dc => 
								<p key = {dc}> <span> {dc} : {getDiagnosisName(dc)} </span> </p>
							)}
						</div>;						
			default:
				break;
		}
	};



	return (
		<>
			<h1>{patient.name} <Icon name={patient.gender === "male" ? "mars" : patient.gender === "female" ? "venus" : "neuter"  } /> </h1>
			<p>ssn: {patient.ssn} </p>
			<p>occupation:  {patient.occupation} </p>
			<h2>entries</h2>
			<Button onClick={() => openModal()}>Add New Entry</Button>
			<div>
				{patient.entries &&  patient.entries.map(entry  => 
					showDetails(entry)
				)}
			</div>
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}			
			/>
		</>	
	);
};

export default PatientDetailsPage;
