<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Workout } from '$lib/workoutData';
	import type { ActionData } from '../../routes/my-workouts/$types';

	import Textarea from './ui/textarea/textarea.svelte';
	import IconBorder from './IconBorder.svelte';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import { set } from 'zod';
	import Icon from '@iconify/svelte';
	import type { Notes, WorkoutWithNotes } from '$lib/types';

	type Props = {
		workout: {
			id?: string;
			title: string;
			description?: string;
			exercises?: string[];
			repsPr?: number;
			timePr?: string;
			minutes?: number;
			seconds?: number;
			notes?: Notes[];
		}
		
	};

	let { workout }: Props = $props();
	let { id, title, description, exercises, repsPr, timePr, minutes, seconds } = workout;

	let exercisesStr = exercises?.join('\n');

	let errorState = $state(false);

	if ($page.url.searchParams.get('error') === 'true') {
		console.log('toast should run');
		toast.error('Workout already exists');
		errorState = true;
		setTimeout(() => {
			errorState = false;
		}, 5000);
		$page.url.searchParams.delete('error');
	}
</script>

{#if errorState}
	<Button variant={'outline'} size={'lg'} class="absolute bottom-3 right-3 flex gap-5"
		><Icon icon="bx:error" color="red" />Workout already exists</Button
	>
{/if}

<Dialog.Root>
	<Dialog.Trigger>
		<IconBorder icon="la:edit" height={24} toolTip="Edit workout" />
	</Dialog.Trigger>
	<Dialog.Content class="max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>
				Make changes to your workout here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/updateWorkout">
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="title" class="text-right">Title</Label>
					<Input id="title" name="title" value={workout.title} required class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="description" class="text-right">Description</Label>
					<Input
						id="description"
						name="description"
						value={workout.description}
						class="col-span-3"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="exercises" class="text-right">Exercises</Label>
					<Textarea id="exercises" name="exercises" value={exercisesStr} class="col-span-3 h-20" />
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="repsPr" class="text-right">Reps PR</Label>
					<Input type="number" id="repsPr" name="repsPr" value={repsPr} class="col-span-3" />
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="timePr" class="text-right">Time PR</Label>
					<Input type="time" id="timePr" name="timePr" value={timePr} class="col-span-3" />
				</div>

				<input type="hidden" name="id" value={id} />
			</div>
			<Dialog.Footer>
				<div>
					<Button type="submit" class="w-full">Save changes</Button>
				</div>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
