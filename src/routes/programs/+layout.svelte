<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { useProgramState } from '$lib/state/program-state.svelte';

	let programState = useProgramState();
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<div class="flex my-3 gap-1">
			<Sidebar.Trigger class="sm:hidden"/>
			<div class="sm:ms-5">{programState.program.title}</div>
		</div>
		<Separator />
		{@render children?.()}
	</main>
</Sidebar.Provider>
