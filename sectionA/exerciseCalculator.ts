interface ExerciseCalculatorParamsParser {
  dailyHours: Array<number>;
  target: number;
}

const parsedArguments = (hours: Array<string>, goal: string): ExerciseCalculatorParamsParser => {
	const arrayValues = hours.map(el => Number(el) );

	if ( !isNaN(Number(goal))
		&& !arrayValues.some(el =>  isNaN(el)  )
	) {	
		
		return {
			dailyHours: arrayValues,
			target: Number(goal)
		};

	} else {
		throw new Error('Provided values were not numbers!');
	}
}


interface ExerciseCalculatorResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises  = (dailyHours: Array<number>, target: number) : ExerciseCalculatorResultObject => {
	const periodLength = dailyHours.length;
	const trainingDays = dailyHours.filter(d => d !== 0).length;
	const average = dailyHours.reduce( (sum, d) => d + sum , 0) / periodLength ;
	const success = average >=  target ;
	const rating = average >= target ? 3 : average >= target * 0.5 ? 2 : 1;
	const ratingDescription = rating == 3 
		? "Well done excelent!" 
		: rating === 2 
			? "Your almost there" 
			: "Not bad keep trying" ;
	

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
}


export const calculate = (hours: Array<string>, goal: string) => {
console.log(hours, goal)
	try {
		const { dailyHours, target } = parsedArguments(hours, goal);
		return calculateExercises (dailyHours, target);
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.'
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return errorMessage;
	}
}

