<script lang="ts">
	import SearchForm from '$lib/components/SearchForm.svelte';
	import * as Card from '$lib/components/ui/card';
	import WorkoutForm from '$lib/components/WorkoutForm.svelte';
	import { workoutsState } from '$lib/state/workoutsState.svelte';
	import { workouts as workoutsData, type Workout } from '../lib/workoutData';

	workoutsState.filteredWorkouts = workoutsData;
	let workouts: Workout[] = workoutsData;
</script>

<SearchForm {workouts} />

<div class="m-3">
	<div class="flex flex-wrap justify-center">
		{#each workoutsState.filteredWorkouts as workout}
			<Card.Root class="m-3 flex w-[300px] flex-col px-5">
				<Card.Header>
					<Card.Title class="mx-auto text-center">{workout.title}</Card.Title>
					<Card.Description class="mx-auto text-center">{workout.description}</Card.Description>
				</Card.Header>
				<Card.Content class="mx-auto">
					{#if workout.exercises}
						{#each workout.exercises as exercise}
							<p>{exercise}</p>
						{/each}
					{/if}
				</Card.Content>
				<!-- could use flex-1 or grow -->
				<Card.Footer class="grow">
					<WorkoutForm {workout} />
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
