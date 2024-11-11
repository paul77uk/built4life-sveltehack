<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import { Label } from '$lib/components/ui/label/index.js';
	import IconBorder from './IconBorder.svelte';
	import Textarea from './ui/textarea/textarea.svelte';

	let { id, text }: { id: string; text: string } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger><IconBorder icon="la:edit" height={24} toolTip="Edit note" /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit note</Dialog.Title>
			<Dialog.Description>
				Make changes to your note here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/editNote">
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Text</Label>
          <Textarea id="text" name="text" value={text} rows={8} class="col-span-3" />
        </div>
      </div>
      <input type="hidden" name="id" value={id} />
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </form>
	</Dialog.Content>
</Dialog.Root>
