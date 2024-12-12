import type { day, daysToWorkouts, notes, program, week, workout } from '$lib/server/db/schema';

export type Workout = typeof workout.$inferSelect;
export type WorkoutInsert = typeof workout.$inferInsert;
export type Notes = typeof notes.$inferSelect;
export type WorkoutWithNotes = Workout & { notes: Notes[] };
export type Program = typeof program.$inferSelect;
export type Week = typeof week.$inferSelect;
export type Day = typeof day.$inferSelect;
export type WeeksWithDay = Week & {
	days: Day[];
};
export type DayWithWorkouts = typeof daysToWorkouts.$inferSelect;
export type ProgramWithWeeksWithDaysWithDaysToWorkoutdWithWorkouts = Program & {
	weeks: Week[] &
		{
			days: Day[] &
				{
					daysToWorkouts: DayWithWorkouts &
						{
							workout: Workout;
						}[];
				}[];
		}[];
};
