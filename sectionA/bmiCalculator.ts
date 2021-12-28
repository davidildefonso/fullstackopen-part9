interface ParamsParser {
  value1: number;
  value2: number;
}

const parseArguments = (height: string, weight: string ): ParamsParser => {

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      value1: Number(height),
      value2: Number(weight)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (a: number, b: number) => {
	const bmi = b * 10000 / (a * a);
	if(bmi < 25){	
		return "Normal (healthy weight)";
	}
	if(bmi <= 29){	
		return "Overweight";
	}	
	return "Obese";
}

export const bmiCalculator = (height: string, weight: string) => {
	try {
		const { value1, value2 } = parseArguments(height, weight);
		return calculateBmi(value1, value2);
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.'
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return errorMessage;
	}
}

