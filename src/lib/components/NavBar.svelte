<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from './ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import '@fontsource/rubik-dirt';

	// let userContext = getUserState();
	// let { user } = $derived(userContext);
	let { isAuthenticated } = $props();
</script>

<div class="bg-black p-3 flex justify-between items-center">
	<a href="/" class="nav-logo text-2xl text-white sm:ms-0 sm:text-3xl lg:text-4xl"
		>BUILT<span class="text-red-600">4</span>LIFE</a
	>

	{#if !isAuthenticated}
		<Button href="/api/auth/login" variant={'destructive'} class="flex gap-2 px-3">
			<Icon icon="material-symbols:login" height={20} color={'white'} />
			Login
		</Button>
	{:else}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				><Icon icon="material-symbols:person" height={30} color={'white'} /></DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<a href="/api/auth/logout">
					<DropdownMenu.Label class="flex gap-2 cursor-pointer">
						<Icon icon="material-symbols:login" height={20} />
						Logout
					</DropdownMenu.Label>
				</a>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</div>
