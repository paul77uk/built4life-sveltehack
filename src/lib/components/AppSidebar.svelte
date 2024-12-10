<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import { programs } from '$lib/programData';
	import { useProgramState } from '$lib/state/program-state.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar';

	let programState = useProgramState();
	let sidebar = useSidebar();
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Menu>
			{#each programs as program (program.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						onclick={() => {
							programState.program = program;
							sidebar.setOpenMobile(false);
						}}
					>
						{#if programState.program.title === program.title}
							<div>
								<div class="font-bold">{program.title}</div>
							</div>
						{:else}
							{program.title}
						{/if}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Content>
</Sidebar.Root>
