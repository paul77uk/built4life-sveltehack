<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	import IconBorder from './IconBorder.svelte';

	let { dayId, workoutId } = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<IconBorder icon="ic:outline-delete" height={22} toolTip="Delete workout" />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your workout and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form method="POST" action="?/deleteDayWorkout">
				<input type="hidden" name="dayId" value={dayId} />
        <input type="hidden" name="workoutId" value={workoutId} />
				<AlertDialog.Action class="w-full">Continue</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
