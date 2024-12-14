<script>
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button';
	import { useMyProgramState } from '$lib/state/my-program-state.svelte';
	import CreateMyProgramWorkout from '$lib/components/CreateMyProgramWorkout.svelte';

	let programState = useMyProgramState();
	let { data } = $props();
	let workouts = data.workouts;
</script>

<Tabs.Root value={programState.program?.weeks[0].title} class="w-fit mx-auto mt-3">
	<Tabs.List class="flex my-3">
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
				<Tabs.Root value={week.days[0].title} class="w-fit">
					<Tabs.List class="flex my-3">
						{#each week.days as day (day.title)}
							<Tabs.Trigger value={day.title}>
								{day.title}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
					{#each week.days as day (day.title)}
						<Tabs.Content value={day.title} class="text-center">
							<CreateMyProgramWorkout dayId={day.id} {workouts} />
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
