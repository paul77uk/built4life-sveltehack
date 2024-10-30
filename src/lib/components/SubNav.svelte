<script>
	import { page } from '$app/stores'

	const links = [
		{
			label: 'Workouts',
			path: '/',
		},
		{
			label: 'My Workouts',
			path: '/my-workouts',
		},
		{
			label: 'Programs',
			path: '/programs',
		},
		{
			label: 'My Programs',
			path: '/my-programs',
		},
		{
			label: 'History',
			path: '/history',
		},
	]
</script>

<nav class=" bg-[#333333]">
	<ul
		class="flex w-full flex-wrap justify-center px-2 text-xs font-semibold uppercase"
	>
		{#each links as { label, path }}
			{#if $page.url.pathname === path}
				<a href={path} class="h-full bg-[#DF0000] p-3 text-white">{label}</a>
			{:else}
				<a href={path} class="p-3 text-white hover:text-[#DF0000]">
					{label}
				</a>
			{/if}
		{/each}
	</ul>
</nav>
