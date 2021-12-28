
import app from '../app';
import supertest from 'supertest';

const api = supertest(app);

beforeAll(done => {
  done()
})


test('ping endpoint return pong', async () => {
	const response = await api.get('/ping');
	expect(response.body).toHaveProperty("data");
	expect(response.body.data).toBe("hola hackermen!");
});





afterAll(done => { 	
 	done()
})

