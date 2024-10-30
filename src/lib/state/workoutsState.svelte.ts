import { workouts } from '$lib/workoutData';

export const workoutsState = $state({
	filteredWorkouts: workouts
});
