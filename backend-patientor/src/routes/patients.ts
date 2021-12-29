import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewPatientVisitEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
   res.send(patientService.getNonSensitivePatientsEntries());
});

router.get('/:id', (req, res) => {
  const diary = patientService.findById(req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});


router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    try {
		const newPatientEntry = toNewPatientVisitEntry(req.body);
		console.log(newPatientEntry);
		const addedEntry = patientService.addPatientEntry( {patientId: patient.id, newEntry: newPatientEntry } );		
		res.json(addedEntry);
	} catch (error: unknown) {
			console.log(error);
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error;
		}
		res.status(400).send(errorMessage);
	}
  } else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const addedPatient = patientService.addPatient(newPatientEntry);		
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;