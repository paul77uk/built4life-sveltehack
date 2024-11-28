<script lang="ts">
	import { programs } from '$lib/programData';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import { useProgramState } from '$lib/state/program-state.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import MyWorkout from '$lib/components/MyWorkout.svelte';

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
				{programState.day?.workouts?.[0].title}
				{#each programState.day?.workouts!! as workout (workout.title)}
					<MyWorkout {workout} />
				{/each}
			</Tabs.Content>
		</Tabs.Root>
	</Tabs.Content>
</Tabs.Root>
