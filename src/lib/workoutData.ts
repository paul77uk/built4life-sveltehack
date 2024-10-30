export type Workout = {
	id?: string,
	title: string;
	description?: string;
	exercises?: string[];
	pr?: number;
	minutes?: number;
	seconds?: number;
};

export const workouts: Workout[] = [
	// index 0
	{
		title: 'BFL Triple Threat',
		description: 'AMRAP in 20 minutes',
		exercises: ['3 Clean & Press (44kg)', '3 Squats (44kg)', '4 Farmers Walk (44kg)'],
		pr: 0,
		minutes: 20,
		seconds: 0
	},
	{
		title: 'BFL BodyWeight',
		description: 'AMRAP in 20 minutes',
		exercises: ['10 Pushups', '10 Curls (17kg)', '10 Lunges'],
		pr: 0,
		minutes: 20,
		seconds: 0
	},
	{
		title: 'BFL BodyWeight 2',
		description: 'AMRAP in 20 minutes',
		exercises: ['8 Dips', '2 Pull Ups', '10 Lunges'],
		pr: 0,
		minutes: 20,
		seconds: 0
	},
	{
		title: 'BFL C&P EMOM',
		description: 'EMOM for 7 minutes',
		exercises: ['10 Clean & Press (28kg)'],
		minutes: 7,
		seconds: 0
	},
	// index 4
	{
		title: 'BFL BodyWeight 3',
		description: 'AMRAP in 20 minutes',
		exercises: ['10 Pushups', '8 Inverted Rows', '10 Lunges'],
		pr: 14,
		minutes: 20,
		seconds: 0
	},
	{
		title: 'Grace',
		description: 'For Time',
		exercises: ['30 Clean & Jerks (61kg)'],
		pr: 0,
		minutes: 0,
		seconds: 0
	},
	{
		title: 'EMOM Squats',
		description: 'EMOM for 10 minutes',
		exercises: ['15 BW Squats'],
		minutes: 10,
		seconds: 0
	},
	{
		title: 'OZ',
		description: 'For Time',
		exercises: ['100 Squat Clean Thrusters (40kg/ 20kg)'],
		minutes: 0,
		seconds: 0
	},
	{
		title: 'Advanced DB Squat for Reps',
		description: 'AMRAP in 1 set',
		exercises: ['100 Squats (100lb/ 45kg)'],
		pr: 0
	},
	{
		title: 'Beginners DB Squat for Reps',
		description: 'AMRAP in 1 set',
		exercises: ['50 Squats (50lb/ 25kg)'],
		pr: 0
	},
	// index 10
	{
		title: 'AMRAP Clean & Press',
		description: 'AMRAP in 1 set',
		exercises: ['Clean & Press (100lb/ 45kg)'],
		pr: 11
	},
	// index 11
	{
		title: 'EMOM Clean & Press',
		description: 'EMOM for 10 minutes',
		exercises: ['5 Clean & Press (100lb/ 45kg)'],
		minutes: 10,
		seconds: 0
	},
	// index 12
	{
		title: 'EMOM Squat',
		description: 'EMOM for 5 minutes',
		exercises: ['8 Squat (50lb/ 25kg)'],
		minutes: 5,
		seconds: 0
	},
	// index 13
	{
		title: 'EMOM Squat 2',
		description: 'EMOM for 10 minutes',
		exercises: ['5 Squat (100lb/ 45kg)'],
		minutes: 10,
		seconds: 0
	},
	// index 14
	{
		title: 'Farmers AMRAP',
		description: 'AMRAP in 1 set',
		exercises: ['Farmers Walk (135lb/ 60kg)'],
		pr: 14
	},
	// index 15
	{
		title: 'EMOM Farmers',
		description: 'EMOM for 5 minutes',
		exercises: ['5 Farmers Walk (135lb/ 60kg)'],
		minutes: 5,
		seconds: 0
	},
	// index 16
	{
		title: 'Push Ups AMRAP',
		description: 'AMRAP in 1 set',
		exercises: ['Push Ups'],
		pr: 28
	},
	// index 17
	{
		title: 'AMRAP Clean & Press 2',
		description: 'AMRAP in 1 set',
		exercises: ['Clean & Press (135lb/ 60kg)'],
		pr: 1
	},
	// index 18
	{
		title: 'AMRAP Push Ups Circuit',
		description: 'AMRAP 5 minutes',
		exercises: ['10 Decline Push Ups'],
		pr: 10,
		minutes: 5,
		seconds: 0
	},
	// index 19
	{
		title: 'AMRAP Inverted Rows',
		description: 'AMRAP in 1 set',
		exercises: ['Inverted Rows'],
		pr: 22
	},
	// index 20
	{
		title: 'AMRAP Inverted Rows Circuit',
		description: 'EMOM for 5 minutes',
		exercises: ['5 Inverted Rows'],
		pr: 7,
		minutes: 5,
		seconds: 0
	},
	// index 21
	{
		title: 'Total Reps Static Lunges',
		description: 'Total Reps in 5 minutes',
		exercises: ['Static Lunges'],
		pr: 88,
		minutes: 5,
		seconds: 0
	},
	// index 22
	{
		title: 'AMRAP Static Lunges',
		description: 'AMRAP in 1 set',
		exercises: ['Static Lunges'],
		pr: 30
	},
	// index 23
	{
		title: 'AMRAP Squats',
		description: 'AMRAP in 1 set',
		exercises: ['Squats (100lb/ 45kg)'],
		pr: 9
	},
	// index 24
	{
		title: 'BFL Triple Threat 10',
		description: 'AMRAP in 20 minutes',
		exercises: ['3 Clean & Press (44kg)', '3 Squats (44kg)', '4 Farmers Walk (44kg)'],
		pr: 0,
		minutes: 20,
		seconds: 0
	},
	// index 25
	{
		title: 'AMRAP Deadlift',
		description: 'AMRAP in 1 set',
		exercises: ['Deadlift (135lb/ 60kg)'],
		pr: 11
	},
	// index 26
	{
		title: 'AMRAP Deadlift in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Deadlift (135lb/ 60kg)'],
		pr: 31,
		minutes: 5,
		seconds: 0
	},
	// index 27
	{
		title: 'AMRAP Bent Row',
		description: 'AMRAP in 1 set',
		exercises: ['Bent Row (135lb/ 60kg)'],
		pr: 7
	},
	// index 28
	{
		title: 'AMRAP Bent Row in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Bent Row (135lb/ 60kg)'],
		pr: 30,
		minutes: 5,
		seconds: 0
	},
	// index 29
	{
		title: 'AMRAP Overhead Press',
		description: 'AMRAP in 1 set',
		exercises: ['Overhead Press (135lb/ 60kg)'],
		pr: 4
	},
	// index 30
	{
		title: 'AMRAP Overhead Press in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Overhead Press (135lb/ 60kg)'],
		pr: 14,
		minutes: 5,
		seconds: 0
	},
	// index 31
	{
		title: 'AMRAP Curls',
		description: 'AMRAP in 1 set',
		exercises: ['Curls (35lb/ 17kg)'],
		pr: 16
	},
	// index 32
	{
		title: 'AMRAP Curls in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Curls (35lb/ 17kg)'],
		pr: 76,
		minutes: 5,
		seconds: 0
	},
	// index 33
	{
		title: 'AMRAP Squats in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Squats (100lb/ 45kg)'],
		pr: 20,
		minutes: 5,
		seconds: 0
	},
	// index 34
	{
		title: 'AMRAP Cleans',
		description: 'AMRAP in 1 set',
		exercises: ['Cleans (135lb/ 60kg)'],
		pr: 4
	},
	// index 35
	{
		title: 'AMRAP Cleans in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Cleans (135lb/ 60kg)'],
		pr: 15,
		minutes: 5,
		seconds: 0
	},
	// index 36
	{
		title: 'AMRAP Shoulder Carry',
		description: 'AMRAP in 1 set',
		exercises: ['Shoulder Carry (135lb/ 60kg)'],
		pr: 6
	},
	// index 37
	{
		title: 'AMRAP Shoulder Carry in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Shoulder Carry (135lb/ 60kg)'],
		pr: 18,
		minutes: 5,
		seconds: 0
	},
	// index 38
	{
		title: 'Sprinting/ Running'
	},
	// index 39
	{
		title: 'AMRAP Dips',
		description: 'AMRAP in 1 set',
		exercises: ['Dips'],
		pr: 14
	},
	// index 40
	{
		title: 'AMRAP Dips in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Dips'],
		pr: 69,
		minutes: 5,
		seconds: 0
	},
	// index 41
	{
		title: 'AMRAP Clean & Press in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Clean & Press (100lb/ 45kg)'],
		pr: 32,
		minutes: 5,
		seconds: 0
	},
	// index 42
	{
		title: 'AMRAP Squats in 5 minutes 2',
		description: 'AMRAP in 5 minutes',
		exercises: ['Squats (50lb/ 25kg)'],
		pr: 51,
		minutes: 5,
		seconds: 0
	},
	// index 43
	{
		title: 'AMRAP Farmers in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Farmers Walk (135lb/ 60kg)'],
		pr: 34,
		minutes: 5,
		seconds: 0
	},
	// index 44
	{
		title: 'AMRAP Push Ups in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Push Ups'],
		pr: 135,
		minutes: 5,
		seconds: 0
	},
	// index 45
	{
		title: 'AMRAP Inverted Rows in 5 minutes',
		description: 'AMRAP in 5 minutes',
		exercises: ['Inverted Rows'],
		pr: 53,
		minutes: 5,
		seconds: 0
	},
	// index 46
	{
		title: 'AMRAP Bent Row 2',
		description: 'AMRAP in 1 set',
		exercises: ['Static Bent Row (100lb/ 45kg)'],
		pr: 0
	},
	// index 47
	{
		title: 'AMRAP Bent Row in 5 minutes 2',
		description: 'AMRAP in 5 minutes',
		exercises: ['Static Bent Row (100lb/ 45kg)'],
		pr: 0,
		minutes: 5,
		seconds: 0
	},
	// index 48
	{
		title: 'AMRAP Clean & Press 3',
		description: 'AMRAP in 1 set',
		exercises: ['Overhead Press (50lb/ 25kg)'],
		pr: 0
	},
	// index 49
	{
		title: 'AMRAP Clean & Press in 5 minutes 2',
		description: 'AMRAP in 5 minutes',
		exercises: ['Overhead Press (50lb/ 25kg)'],
		pr: 0,
		minutes: 5,
		seconds: 0
	},
	// index 50
	{
		title: 'AMRAP Right Arm Clean & Press',
		description: 'AMRAP in 1 set',
		exercises: ['Curls (65lb/ 30kg)'],
		pr: 0
	}
];