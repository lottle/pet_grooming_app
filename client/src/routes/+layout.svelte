<script lang="ts">
	import '../app.css';
	import { authStore } from '$lib/stores/auth.svelte';

	let { children, data } = $props();

	$effect(() => {
		authStore.set(data.user ?? null as null);
	});
</script>

{@render children()}
