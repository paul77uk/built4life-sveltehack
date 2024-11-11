import type { notes, workout } from '$lib/server/db/schema';

export type Workout = typeof workout.$inferSelect;
export type WorkoutInsert = typeof workout.$inferInsert;
export type Notes = typeof notes.$inferSelect;
export type WorkoutWithNotes = Workout & { notes: Notes[] };
