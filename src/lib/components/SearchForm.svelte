<script lang="ts">
	import { workoutsState } from '$lib/state/workoutsState.svelte';
	import Icon from '@iconify/svelte';
	import { Input } from './ui/input';
	import { workouts, type Workout } from '$lib/workoutData';

	// let initialQuery = $page.url.searchParams.get('query') || ''

	type Props = {
		workouts: Workout[];
	};

	let query = $state('');
	let { workouts: propWorkouts }: Props = $props();
</script>

<search>
	<form class="relative mx-auto flex w-fit mt-6" data-sveltekit-keepfocus>
		<Icon
			icon="mingcute:search-line"
			class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
		/>
		<Input
			class="pl-8"
			bind:value={query}
			oninput={() => {
				workoutsState.filteredWorkouts = propWorkouts.filter((workout) =>
					workout.title.toLowerCase().includes(query.toLowerCase())
				);
			}}
			type="search"
			placeholder="Search workouts..."
		/>
	</form>
</search>
