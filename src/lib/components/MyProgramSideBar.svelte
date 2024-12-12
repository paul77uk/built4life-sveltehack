<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import { useSidebar } from '$lib/components/ui/sidebar';
	import { useMyProgramState } from '$lib/state/my-program-state.svelte';

	let myProgramState = useMyProgramState();
	let sidebar = useSidebar();
	let { programs } = $props();
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Menu>
			{#each programs as program (program.id)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						onclick={() => {
							myProgramState.program = program;
							sidebar.setOpenMobile(false);
						}}
					>
						{#if myProgramState.program?.title === program.title}
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
