<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Notes, WorkoutWithNotes } from '$lib/types';

	import IconBorder from './IconBorder.svelte';
	import * as Card from '$lib/components/ui/card';
	import DeleteNote from './DeleteNote.svelte';
	import EditNote from './EditNote.svelte';

	type Props = {
		notes: Notes[];
	};

	let { notes }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger
		><IconBorder
			icon="pixelarticons:notes-multiple"
			height={18}
			toolTip="View notes"
			className="py-2 px-1.5"
		/></Dialog.Trigger
	>
	{#if notes.length === 0}
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>No notes</Dialog.Title>
				<Dialog.Description>You have not added any notes to this workout yet.</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	{:else}
		<Dialog.Content class="sm:max-w-[425px] ">
			{#each notes as note}
				<div class="mt-6">
					<Card.Root>
						<Card.Header>
							<!-- <Card.Title>Notifications</Card.Title> -->
							<Card.Description>{note.createdAt}</Card.Description>
						</Card.Header>
						<Card.Content>{note.text}</Card.Content>
						<Card.Footer class="flex justify-end gap-1">
							<EditNote id={note.id} text={note.text} />
							<DeleteNote id={note.id} />
						</Card.Footer>
					</Card.Root>
				</div>
			{/each}
		</Dialog.Content>
	{/if}
</Dialog.Root>
