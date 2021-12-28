
import app from '../src/app';
import supertest from 'supertest';
import { initialDiagnoses, initialPatients } from './testHelper';
import  diagnosesService from '../src/services/diagnosesService'
import  patientService from '../src/services/patientService'

const api = supertest(app);

beforeAll(done => {
  done()
})


test('ping endpoint return pong', async () => {
	const response = await api.get('/api/ping');
	expect(response.body).toHaveProperty("data");
	expect(response.body.data).toBe("hola hackermen!");
});


test('request to patients endpoint returns patients data ', async () => {
	const response = await api.get('/api/patients');
	expect(response.body).toHaveLength(initialPatients.length);
	expect(response.body[0].name).toBe("John McClane");
});



test('request to diagnoses endpoint returns diagnoses data ', async () => {
	const response = await api.get('/api/diagnoses');
	expect(response.body).toHaveLength(initialDiagnoses.length);
	expect(response.body[0].name).toBe("Disorder of ligament");
});

test('a single diagnoses endpoint can be seen ', async () => {	

	const diagnosesToView = initialDiagnoses[0];

	const response = await api
		.get(`/api/diagnoses/${diagnosesToView.code}`)
		.expect(200)
		.expect('Content-Type', /application\/json/);	

	expect(response.body).toEqual(initialDiagnoses[0]);	
});


test('a single patient endpoint can be seen ', async () => {
	const patientToView = initialPatients[0];

	const response = await api
		.get(`/api/patients/${patientToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/);	

	expect(response.body).toEqual(initialPatients[0]);	
});


test('a valid diagnoses   can be added ', async () => {

	const initialDiagnosesCount = diagnosesService.getDiagnoses().length;

	const newDiagnoses = {
		code: "mu23.21" ,
		name: "brain pain",
		latin: "isla numric il a don vue"
	};

	const response = await api
						.post('/api/diagnoses')	
						.send(newDiagnoses)
						.expect(200)
						.expect('Content-Type', /application\/json/);

	
	expect(response.body).toHaveProperty("code") ;
	expect(response.body.code).toBe("mu23.21");
	expect(diagnosesService.getDiagnoses().length).toBe(initialDiagnosesCount + 1);
	
});


test('a valid  patient  can be added ', async () => {

	const initialPatientsCount = patientService.getPatients().length;

	const newPatient = {
		name: "monito geek" ,
		dateOfBirth: "1990-12-25",
		ssn: "235656985",
		gender: "male",
		occupation: "software developer"
	};

	const response = await api
						.post('/api/patients')	
						.send(newPatient)
						.expect(200)
						.expect('Content-Type', /application\/json/);				

	
	expect(response.body).toHaveProperty("id") ;
	expect(response.body.occupation).toBe("software developer");
	expect(response.body.ssn).toBe("235656985");
	expect(patientService.getPatients().length).toBe(initialPatientsCount + 1);

	
});


afterAll(done => { 	
 	done()
})

