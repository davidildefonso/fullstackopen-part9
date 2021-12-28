
import app from '../src/app';
import supertest from 'supertest';
import { initialDiagnoses, initialPatients } from './testHelper';

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





afterAll(done => { 	
 	done()
})

