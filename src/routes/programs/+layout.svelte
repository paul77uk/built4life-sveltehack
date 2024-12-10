<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { useProgramState } from '$lib/state/program-state.svelte';
	import { Button } from '$lib/components/ui/button';

	let programState = useProgramState();
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<div class="flex my-3 gap-2 items-center">
			<Sidebar.Trigger class="sm:hidden" />
			<div class="sm:ms-3">{programState.program.title}</div>
			<form method="POST">
				<input type="hidden" name="title" value={programState.program.title} />
				<Button type="submit" variant={'outline'}>Add to My Programs</Button>
			</form>
		</div>
		<Separator />
		{@render children?.()}
	</main>
</Sidebar.Provider>
