<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import { Separator } from '$lib/components/ui/separator';
	import { useMyProgramState } from '$lib/state/my-program-state.svelte';
	import { Button } from '$lib/components/ui/button';
	import MyProgramSideBar from '$lib/components/MyProgramSideBar.svelte';
	import NewProgramDialog from '$lib/components/NewProgramDialog.svelte';

	let programState = useMyProgramState();
	let { children, data } = $props();
	let programs = data.programs;
	programState.program = programs?.[0];
</script>

<Sidebar.Provider>
	<MyProgramSideBar {programs} />
	<main class="w-full">
		<div class="flex my-3 gap-2 items-center">
			<Sidebar.Trigger class="sm:hidden" />
			<div class="sm:ms-3">{programState.program?.title}</div>
			<NewProgramDialog />
		</div>
		<Separator />
		{@render children()}
	</main>
</Sidebar.Provider>
