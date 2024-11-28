import { workouts } from './workoutData';

export const programs = [
	{
		title: 'Building the Monolith',
		description: '6 week program',
		weeks: [
			{
				title: 'BTM Week 1',
				days: [
					{
						title: 'Day 1',
						workouts: [workouts[51], workouts[52], workouts[53]]
					},
					{
						title: 'Day 2',
						workouts: [workouts[48], workouts[49], workouts[50]]
					}
				]
			},
			{ title: 'Week 2',
				days: [
					{
						title: 'Day 1',
						workouts: [workouts[45], workouts[46], workouts[47]]
					},
					{
						title: 'Day 2',
						workouts: [workouts[42], workouts[43], workouts[44]]
					}
				]
			 }
		]
	},
	{
		title: 'Program 2',
		description: '6 week program',
		weeks: [
			{
				title: 'P2 Week 1',
				days: [
					{
						title: 'Day 1',
						workouts: [workouts[0], workouts[1], workouts[2]]
					},
					{
						title: 'Day 2',
						workouts: [workouts[3], workouts[4], workouts[5]]
					}
				]
			},
			{ title: 'Week 2',
				days: [
					{
						title: 'Day 1',
						workouts: [workouts[6], workouts[7], workouts[8]]
					},
					{
						title: 'Day 2',
						workouts: [workouts[9], workouts[10], workouts[11]]
					}
				]
			 }
		]
	}
];
