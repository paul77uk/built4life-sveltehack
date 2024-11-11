import { relations } from 'drizzle-orm';
import { pgTable, text, integer, uuid, timestamp } from 'drizzle-orm/pg-core';

export const workout = pgTable('workout', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description'),
	exercises: text('exercises').array(),
	repsPr: integer('pr'),
	timePr: text('time_pr'),
	minutes: integer('minutes'),
	seconds: integer('seconds'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow(),
	userId: text('user_id').notNull()
});

export const notes = pgTable('notes', {
	id: uuid('id').primaryKey().defaultRandom(),
	text: text('text').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow(),
	workoutId: uuid('workout_id')
		.notNull()
		.references(() => workout.id)
});

export const workoutRelations = relations(workout, ({ many }) => ({
	notes: many(notes)
}));

export const notesRelations = relations(notes, ({ one }) => ({
	workout: one(workout, {
		fields: [notes.workoutId],
		references: [workout.id]
	})
}));
