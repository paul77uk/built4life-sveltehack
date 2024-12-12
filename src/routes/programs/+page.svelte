<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card';
	import { useProgramState } from '$lib/state/program-state.svelte';

	let programState = useProgramState();
</script>

<Tabs.Root value={programState.week.title} class="flex flex-col mt-3 items-center text-center">
	<Tabs.List>
		{#each programState.program.weeks as week (week.title)}
			<Tabs.Trigger
				value={week.title}
				onclick={() => {
					programState.week = week;
				}}>{week.title}</Tabs.Trigger
			>
		{/each}
	</Tabs.List>

	<Tabs.Content value={programState.week?.title!!}>
		<Tabs.Root value={programState.day.title}>
			<Tabs.List>
				{#each programState.week?.days!! as day (day.title)}
					<Tabs.Trigger value={day.title} onclick={() => (programState.day = day)}
						>{day.title}</Tabs.Trigger
					>
				{/each}
			</Tabs.List>

			<Tabs.Content value={programState.day?.title!!}>
				{#each programState.day?.workouts!! as workout (workout.title)}
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
					</Card.Root>
				{/each}
			</Tabs.Content>
		</Tabs.Root>
	</Tabs.Content>
</Tabs.Root>
