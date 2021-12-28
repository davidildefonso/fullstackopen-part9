import express from 'express';
import {bmiCalculator} from './bmiCalculator'
import {calculate} from './exerciseCalculator'

const app = express();

app.use(express.json({strict: false}));

app.get('/bmi', (req, res) => {
	if(!req.query.height){
		res.status(404).send("Missing height");
	}
	if(!req.query.weight){
		res.status(404).send("Missing weight");	
	}

	if(req.query.height && req.query.weight){	
		const height:string = req.query.height.toString();
		const weight:string = req.query.weight.toString();	
		res.status(200).json({
			weight,
			height,
			bmi: bmiCalculator(height, weight)
		});	
	}

});

app.post('/calculate', (req, res) => {


	try {
		console.log(req.body)
		const { daily_exercises, target } = req.body;		
		const result = calculate(daily_exercises, target);
		console.log(result)
		res.json({result});
	} catch (error) {
		console.log(error)
		res.status(404).send(error)
	}


});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});