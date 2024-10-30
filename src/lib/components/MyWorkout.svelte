<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import Icon from '@iconify/svelte';

	import { Button } from './ui/button';
	import { Input } from './ui/input';

	type Workout = {
		id?: string;
		title: string;
		description?: string;
		exercises?: string[];
		pr?: number;
		minutes?: number;
		seconds?: number;
	};

	let { id, title, description, exercises, pr, minutes, seconds }: Workout = $props();

	let prAttempt = $state(0);
</script>

<Card.Root class="m-3 flex w-[300px] flex-col px-5">
	<Card.Header>
		<Card.Title class="mx-auto text-center">{title}</Card.Title>
		<Card.Description class="mx-auto text-center">{description}</Card.Description>
	</Card.Header>
	<Card.Content class="mx-auto flex h-full flex-col">
		{#if exercises}
			{#each exercises as exercise}
				<p>{exercise}</p>
			{/each}
		{/if}
		{#if pr !== null}
			<div class="flex flex-1 flex-col justify-center">
				<div
					class="m-3 mx-auto w-fit rounded border border-dashed px-3 py-1 text-center text-gray-500"
				>
					PR: {pr}
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
	</Card.Content>
	<!-- could use flex-1 or grow -->
	<!-- TODO: change form to superforms and can add toasts to say was saved to history and well done for new pr-->
	<Card.Footer class="grow">
		<form method="POST" class="w-full" action="?/updatePR">
			<Input type="hidden" class="w-12 text-center" name={'prAttempt'} bind:value={prAttempt} />

			<input type="hidden" name={'id'} value={id} />
			<Button type={'submit'} class="w-full">Save Result</Button>
		</form>
	</Card.Footer>
</Card.Root>
