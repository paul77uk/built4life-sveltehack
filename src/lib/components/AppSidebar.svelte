<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import { programs } from '$lib/programData';
	import { useProgramState } from '$lib/state/program-state.svelte';

	let programState = useProgramState();
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Menu>
			{#each programs as program (program.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						onclick={() => {
							programState.program = program;
						}}
					>
						{program.title}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Content>
</Sidebar.Root>
