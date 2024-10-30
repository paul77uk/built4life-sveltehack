import type { workout } from '$lib/server/db/schema';

export type Workout = typeof workout.$inferSelect;
export type WorkoutInsert = typeof workout.$inferInsert;
