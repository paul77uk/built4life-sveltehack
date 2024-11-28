<script lang="ts">
	import NavBar from '../lib/components/NavBar.svelte';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import SubNav from '$lib/components/SubNav.svelte';


	let { children, data } = $props();
	let isAuthenticated = data.isAuthenticated;
	// let { session, supabase } = $derived(data);

	// let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user });

	// $effect(() => {
	// 	const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
	// 		if (!newSession) {
	// 			setTimeout(() => {
	// 				goto('/', { invalidateAll: true });
	// 			});
	// 		}

	// 		if (newSession?.expires_at !== session?.expires_at) {
	// 			invalidate('supabase:auth');
	// 		}
	// 	});

	// 	return () => data.subscription.unsubscribe();
	// });
</script>


	<main>
		<Toaster />
		<NavBar {isAuthenticated} />
		<SubNav />
		{@render children()}
	</main>

