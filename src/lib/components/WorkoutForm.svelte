<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import { toast } from 'svelte-sonner';
	import Icon from '@iconify/svelte';
	import type { Workout } from '$lib/workoutData';
	import { enhance } from '$app/forms';

	let {
		workout
	}: {
		workout: Workout;
	} = $props();
	let creating = $state(false);
	// let deleting = $state([]);

	// const { form, enhance, delayed, formId } = superForm(workout, {
	// 	id: workout.title,

	// 	dataType: 'json',
	// 	onSubmit: () => {
	// 		$form.title = workout.title;
	// 		if (workout.description) $form.description = workout.description;
	// 		if (workout.exercises) $form.exercises = workout.exercises;
	// 		if (workout.pr) $form.pr = workout.pr;
	// 		if (workout.minutes) $form.minutes = workout.minutes;
	// 		if (workout.seconds) $form.seconds = workout.seconds;
	// 	},

	// 	onUpdated: ({ form }) => {
	// 		if (form.valid) {
	// 			toast.success(`Workout ${workout.title} added to your workouts`);
	// 		} else {
	// 			toast.error(`${workout.title} already exists in your workouts`);
	// 		}
	// 	}
	// });
</script>

<form
	method="POST"
	class="w-full"
	use:enhance={() => {
		creating = true;

		return async ({ result, update }) => {
			await update();

			creating = false;

			if (result.type === 'failure') toast.error(result.data?.message as string);
		};
	}}
>
	<input type="hidden" name="title" value={workout.title} />
	<!-- <input type="hidden" name="description" value={workout.description} />
	{#if workout.exercises}
		{#each workout.exercises as exercise}
			<input type="hidden" name="exercises" value={exercise} />
		{/each}
	{/if}
	<input type="hidden" name="pr" value={workout.pr} />
	<input type="hidden" name="minutes" value={workout.minutes} />
	<input type="hidden" name="seconds" value={workout.seconds} /> -->

	<Button type={'submit'} class="w-full" disabled={creating}
		>{#if creating}
			<Icon class="size-4 animate-spin" icon="icomoon-free:spinner9" color={'red'} height={20} />
		{:else}
			Add to my workouts
		{/if}</Button
	>
</form>
