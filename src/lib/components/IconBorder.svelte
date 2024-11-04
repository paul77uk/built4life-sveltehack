<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Icon from '@iconify/svelte';
	import { buttonVariants } from './ui/button';
	import { cn } from '$lib/utils';

	type Props = {
		icon: string;
		height: number;
		toolTip: string;
		className?: string;
	};

	let { icon, height, toolTip, className }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class={cn('border p-1 rounded hover:bg-gray-100', className)}>
			<Icon {icon} {height} />
		</Tooltip.Trigger>
		<Tooltip.Content class={buttonVariants({ variant: 'outline' })}>
			<div class="text-black">{toolTip}</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
