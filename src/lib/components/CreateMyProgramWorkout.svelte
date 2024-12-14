<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { useMyProgramState } from '$lib/state/my-program-state.svelte';

	let { dayId, workouts } = $props();
	let workoutId = $state('');
	let program = useMyProgramState();
</script>

<div class="flex items-center gap-2">
	<Select.Root type="single">
		<Select.Trigger class="w-[180px]">Workouts</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each workouts as workout}
					<Select.Item
						value={workout.title}
						label={workout.title}
						onclick={() => {
							workoutId = workout.id;
						}}
					/>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<form method="POST" action="?/insertWorkout">
		<input type="hidden" name="dayId" value={dayId} />
		<input type="hidden" name="workoutId" value={workoutId} />
		<input type="hidden" name="programId" value={program.program?.id} />
		<Button type="submit">Save</Button>
	</form>
</div>

<!-- <Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Workout +</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<form method="POST">
			<Dialog.Header>
				<Dialog.Title>Add Workout</Dialog.Title>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="title" class="text-right">Title</Label>
					<Input id="title" name="title" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right">Username</Label>
					<Input id="username" value="@peduarte" class="col-span-3" />
				</div>
				<input type="hidden" name="dayId" />
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root> -->
