<script lang="ts">
	import { page } from '$app/stores';

	import SearchForm from '$lib/components/SearchForm.svelte';

	import { workoutsState } from '$lib/state/workoutsState.svelte';

	import { toast } from 'svelte-sonner';
	import MyWorkout from '$lib/components/MyWorkout.svelte';
	import CreateWorkout from '$lib/components/CreateWorkout.svelte';
	import type { Notes } from '$lib/types/index.js';

	type Workout = {
		id?: string;
		title: string;
		description?: string;
		exercises?: string[];
		repsPr?: number;
		timePr?: string;
		minutes?: number;
		seconds?: number;
		notes?: Notes[];
	};

	let { data } = $props();

	let workouts: Workout[] = data.workouts as Workout[];
	workoutsState.filteredWorkouts = data.workouts as Workout[];

	const workoutTitle = $page.url.searchParams.get('title');

	if ($page.url.searchParams.get('redirected') === '1') {
		toast.success(`${workoutTitle} added successfully`);
		$page.url.searchParams.delete('redirected');
		history.replaceState({}, '', $page.url.toString());
	}
	$inspect(workoutsState.filteredWorkouts);
</script>

<div class=" flex items-center justify-center gap-3">
	<SearchForm {workouts} />
	{#if data.form}
		<CreateWorkout data={data.form} />
	{/if}
</div>

{#if workoutsState.filteredWorkouts.length < 1}
	<p>No Workouts</p>
{:else}
	<div class="m-3 flex flex-wrap justify-center">
		{#each workoutsState.filteredWorkouts as workout}
			<!-- <MyWorkout {...workout} /> -->
			<MyWorkout {workout} />
		{/each}
	</div>
{/if}
