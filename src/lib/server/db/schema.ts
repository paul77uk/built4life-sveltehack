import { pgTable, text, integer, uuid, timestamp } from 'drizzle-orm/pg-core';

export const workout = pgTable('workout', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description'),
	exercises: text('exercises').array(),
	pr: integer('pr'),
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
