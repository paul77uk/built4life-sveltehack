import type { ProgramWithWeeksWithDaysWithDaysToWorkoutdWithWorkouts } from '$lib/types';

let programState: ProgramWithWeeksWithDaysWithDaysToWorkoutdWithWorkouts | undefined = $state();

const useMyProgramState = () => {
	return {
		get program() {
			return programState;
		},
		set program(value) {
			programState = value;
		}
	};
};

export { useMyProgramState };
