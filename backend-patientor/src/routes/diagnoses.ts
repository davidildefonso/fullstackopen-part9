import express from 'express';
import diagnosesService from '../services/diagnosesService';
import {toNewDiagnosesEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
   res.send(diagnosesService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  const diary = diagnosesService.findById(req.params.code);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});



router.post('/', (req, res) => {
  	try {
		const newDiagnosesEntry = toNewDiagnosesEntry(req.body);
		const addedDiagnoses = diagnosesService.addDiagnoses(newDiagnosesEntry);		
		res.json(addedDiagnoses);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;