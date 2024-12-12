<script>
	import { useMyProgramState } from '$lib/state/my-program-state.svelte';

	let programState = useMyProgramState();
</script>

<main>
	<h1>My Programs</h1>
	<ul>
		<li>{programState?.program?.title}</li>
		{#if programState && programState.program}
			{#each programState.program.weeks as week}
				<li>{week.title}</li>
				{#each week.days as day}
					<li>{day.title}</li>
					{#each day.daysToWorkouts as dayToWorkout}
						<div>{dayToWorkout.workout.title}</div>
						{#if dayToWorkout.workout.exercises}
							{#each dayToWorkout.workout.exercises as exercise}
								<p>{exercise}</p>
							{/each}
						{/if}
					{/each}
				{/each}
			{/each}
		{/if}
	</ul>
</main>
