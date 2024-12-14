<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
		>Program <span class="font-semibold text-2xl mb-1">+</span></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<form method="POST" action="?/insertProgram">
			<Dialog.Header>
				<Dialog.Title>Create New Program</Dialog.Title>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="title" class="text-right">Title</Label>
					<Input id="title" name="title" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="numOfWeeks" class="text-right">Number of weeks</Label>
					<Input id="numOfWeeks" name="numOfWeeks" class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
