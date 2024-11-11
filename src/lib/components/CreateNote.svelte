<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import IconBorder from './IconBorder.svelte';
	import Textarea from './ui/textarea/textarea.svelte';

	let { id } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger
		><IconBorder
			icon="material-symbols-light:add-notes-outline-rounded"
			height={24}
			toolTip="Add Note"
		/></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create Note</Dialog.Title>
			<Dialog.Description>
				Ceate your workout notes here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/createNote">
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="text" class="text-right">Text</Label>
					<Textarea id="text" name="text" rows={5} class="col-span-3" />
				</div>

				<input type="hidden" name="id" value={id} />
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
