import { programs } from '$lib/programData';

let programState = $state(programs[0]);
let weekState = $state(programState.weeks[0]);
let dayState = $state(weekState.days[0]);

const useProgramState = () => {
	return {
		get program() {
			return programState;
		},
		set program(value) {
			programState = value;
      weekState = value.weeks[0];
      dayState = value.weeks[0].days[0];
		},
		get week() {
			return weekState;
		},
		set week(value) {
			weekState = value;
      dayState = value.days[0];
		},
		get day() {
			return dayState;
		},
		set day(value) {
			dayState = value;
		}
	};
};

export { useProgramState };
