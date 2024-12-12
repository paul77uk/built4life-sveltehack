<script>
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card/index';
	import { useMyProgramState } from '$lib/state/my-program-state.svelte';

	let programState = useMyProgramState();
</script>

<!-- <main>
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
</main> -->

<Tabs.Root value={programState.program?.weeks[0].title} class="w-[400px] mx-auto mt-3">
	<Tabs.List class="grid w-full grid-cols-2 my-3">
		{#if programState.program}
			{#each programState.program.weeks as week (week.title)}
				<Tabs.Trigger value={week.title}>
					{week.title}
				</Tabs.Trigger>
			{/each}
		{/if}
	</Tabs.List>
	{#if programState.program}
		{#each programState.program.weeks as week (week.title)}
			<Tabs.Content value={week.title}>
				<Tabs.Root value={week.days[0].title} class="w-[400px]">
					<Tabs.List class="grid w-full grid-cols-2 my-3">
						{#each week.days as day (day.title)}
							<Tabs.Trigger value={day.title}>
								{day.title}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
					{#each week.days as day (day.title)}
						<Tabs.Content value={day.title}>
							{#each day.daysToWorkouts as dayToWorkout}
								<Card.Root class="my-5">
									<Card.Header>
										<Card.Title class="text-center mb-2">{dayToWorkout.workout.title}</Card.Title>
									</Card.Header>
									<Card.Description class="text-center"
										>{dayToWorkout.workout.description}</Card.Description
									>
									<Card.Content class="text-center">
										{#if dayToWorkout.workout.exercises}
											{#each dayToWorkout.workout.exercises as exercise}
												<p>{exercise}</p>
											{/each}
										{/if}
									</Card.Content>
								</Card.Root>
							{/each}
						</Tabs.Content>
					{/each}
				</Tabs.Root>
			</Tabs.Content>
		{/each}
	{/if}
</Tabs.Root>
