import express from 'express';
import {bmiCalculator} from './bmiCalculator'

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});