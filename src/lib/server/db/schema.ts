import { relations } from 'drizzle-orm';
import { pgTable, text, integer, uuid, timestamp, primaryKey } from 'drizzle-orm/pg-core';

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
		.references(() => workout.id, { onDelete: 'cascade' })
});

export const workoutRelations = relations(workout, ({ many }) => ({
	notes: many(notes),
	daysToWorkouts: many(daysToWorkouts)
}));

export const notesRelations = relations(notes, ({ one }) => ({
	workout: one(workout, {
		fields: [notes.workoutId],
		references: [workout.id]
	})
}));

export const program = pgTable('program', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow(),
	userId: text('user_id').notNull()
});

export const week = pgTable('week', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow(),
	programId: uuid('program_id')
		.notNull()
		.references(() => program.id, { onDelete: 'cascade' })
});

export const day = pgTable('day', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow(),
	weekId: uuid('week_id')
		.notNull()
		.references(() => week.id, { onDelete: 'cascade' })
});

export const programRelations = relations(program, ({ many }) => ({
	weeks: many(week)
}));

export const weekRelations = relations(week, ({ many, one }) => ({
	days: many(day),
	program: one(program, {
		fields: [week.programId],
		references: [program.id]
	})
}));

export const dayRelations = relations(day, ({ one, many }) => ({
	week: one(week, {
		fields: [day.weekId],
		references: [week.id]
	}),
	daysToWorkouts: many(daysToWorkouts)
}));

export const daysToWorkouts = pgTable(
	'days_to_workouts',
	{
		dayId: uuid('day_id')
			.notNull()
			.references(() => day.id),
		workoutId: uuid('workout_id')
			.notNull()
			.references(() => workout.id),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'date'
		})
			.notNull()
			.defaultNow()
	},
	(t) => ({
		pk: primaryKey({ columns: [t.dayId, t.workoutId] })
	})
);

export const daysToWorkoutsRelations = relations(daysToWorkouts, ({ one }) => ({
	day: one(day, {
		fields: [daysToWorkouts.dayId],
		references: [day.id]
	}),
	workout: one(workout, {
		fields: [daysToWorkouts.workoutId],
		references: [workout.id]
	})
}));
