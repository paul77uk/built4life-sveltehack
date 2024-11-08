<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import Icon from '@iconify/svelte';

	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { Workout } from '$lib/workoutData';
	import DeleteWorkout from './DeleteWorkout.svelte';
	import IconBorder from './IconBorder.svelte';
	import EditWorkout from './EditWorkout.svelte';
	import type { ActionData } from '../../routes/my-workouts/$types';

	type Props = {
		workout: Workout;
		form: ActionData;
	};

	let { workout, form }: Props = $props();
	let { id, title, description, exercises, repsPr, timePr, minutes, seconds } = workout;

	let prAttempt = $state(0);
	let timePrAttempt = $state('00:00');
	let prState = $state(repsPr);
	let timePrState = $state(timePr);
	let creating = $state(false);
</script>

<Card.Root class="m-3 flex w-[300px] flex-col px-5">
	<Card.Header>
		<Card.Title class="mx-auto text-center flex gap-2 items-center">
			<!-- 
			<Icon icon="arcticons:firefoxnotes" height={22} /> 
			<!-- -->

			{title}
			<!-- <Icon icon="lets-icons:info-alt-duotone" height="40" /> -->
			<!-- <Icon icon="circum:circle-info" height={35}/> -->
			<!-- <Icon icon="lets-icons:info-alt-light" height={40} /> -->
		</Card.Title>
		<Card.Description class="mx-auto text-center">{description}</Card.Description>
	</Card.Header>
	<Card.Content class="mx-auto flex h-full flex-col">
		{#if exercises}
			{#each exercises as exercise}
				<p>{exercise}</p>
			{/each}
		{/if}
		{#if repsPr !== null}
			<div class="flex flex-1 flex-col justify-center">
				<div class="flex items-center mx-auto gap-2">
					PR:
					<div
						class="m-3 mx-auto w-fit rounded border border-dashed px-3 py-1 text-center text-gray-500"
					>
						{prState}
					</div>
				</div>
				<div class="flex justify-center gap-1">
					<Button
						class="w-8 p-0"
						onclick={() => {
							if (prAttempt > 0) prAttempt -= 1;
						}}><Icon icon="ic:baseline-minus" height={18} /></Button
					>
					<form>
						<Input class="w-12 text-center" bind:value={prAttempt} min={0} />
					</form>

					<Button
						class="w-8 p-0"
						onclick={() => {
							prAttempt += 1;
							console.log(typeof prAttempt);
						}}><Icon icon="ic:baseline-plus" height={18} /></Button
					>
				</div>
			</div>
		{/if}

		{#if timePr !== null && timePr !== ''}
			<div class="flex flex-1 flex-col justify-center">
				<div class="flex items-center mx-auto gap-2">
					PR:
					<div
						class="m-3 mx-auto w-fit rounded border border-dashed px-3 py-1 text-center text-gray-500"
					>
						{timePrState}
					</div>
				</div>
				<div class="flex justify-center gap-1">
					<form>
						<Input type="time" class="w-18 text-center" bind:value={timePrAttempt} />
					</form>
				</div>
			</div>
		{/if}
	</Card.Content>
	<!-- could use flex-1 or grow -->
	<!-- TODO: change form to superforms and can add toasts to say was saved to history and well done for new pr-->
	<Card.Footer class="grow">
		<form
			method="POST"
			class="w-full"
			action="?/updatePR"
			use:enhance={() => {
				creating = true;

				return async ({ result, update }) => {
					await update();

					creating = false;

					if (result.type === 'failure') toast.error('No PR this time');
					else {
						if (repsPr !== null) {
							toast.success('Well done! New PR');
							prState = prAttempt;
						}
						if (timePr !== null) {
							toast.success('Well done! New PR');
							timePrState = timePrAttempt;
						}
					}
					prAttempt = 0;
					timePrAttempt = '00:00';
				};
			}}
		>
			<Input type="hidden" class="w-12 text-center" name={'prAttempt'} bind:value={prAttempt} />

			<Input
				type="hidden"
				class="w-12 text-center"
				name={'timePrAttempt'}
				bind:value={timePrAttempt}
			/>

			<input type="hidden" name={'id'} value={id} />

			{#if repsPr !== null || timePr !== null}
				<Button type={'submit'} class="w-full" disabled={creating}
					>{#if creating}
						<Icon
							class="size-4 animate-spin"
							icon="icomoon-free:spinner9"
							color={'red'}
							height={20}
						/>
					{:else}
						Save Result
					{/if}</Button
				>
			{/if}

			<!-- <Button variant={'outline'} class="w-full mt-3">Add Note</Button> -->
			<div class="flex items-center justify-center mt-4 gap-2">
				<IconBorder
					icon="material-symbols-light:add-notes-outline-rounded"
					height={24}
					toolTip="Add Note"
				/>
				<IconBorder
					icon="pixelarticons:notes-multiple"
					height={18}
					toolTip="View notes"
					className="py-2 px-1.5"
				/>

				<IconBorder icon="clarity:help-info-line" height={22} toolTip="Info" className="py-1.5" />

				<IconBorder icon="mdi-light:share" height={26} toolTip="Share workout" />

				<EditWorkout {workout} {form} />
				<DeleteWorkout {id} />
			</div>
		</form>
	</Card.Footer>
</Card.Root>
