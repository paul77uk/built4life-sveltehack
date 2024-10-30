<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { registerSchema } from './registerSchema';
	import Icon from '@iconify/svelte';

	// let { form } = $props();
	// $inspect(form);

	export let data: SuperValidated<Infer<typeof registerSchema>>;

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(registerSchema)
	});

	const { form: formData, enhance, delayed, errors } = form;

	console.log($formData);
</script>

<div class="h-[calc(100vh-60px)] flex items-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<!-- {#if form && form.errors?.length}
					{#each form.errors as error}
						<p class="text-red-500 text-sm font-bold">{error}</p>
					{/each}
				{/if} -->
				<div class="grid gap-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="grid gap-2">
							<!-- <Label for="first-name">First name</Label>
							<Input
								id="first-name"
								placeholder="Max"
								name="firstName"
								value={form?.firstName || ''}
							/> -->
							<Form.Field {form} name="firstName">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>First name</Form.Label>
										<Input {...props} bind:value={$formData.firstName} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="grid gap-2">
							<!-- <Label for="last-name">Last name</Label>
							<Input
								id="last-name"
								placeholder="Robinson"
								name="lastName"
								value={form?.lastName || ''}
							/> -->
							<Form.Field {form} name="lastName">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Last name</Form.Label>
										<Input {...props} bind:value={$formData.lastName} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="grid gap-2">
						<!-- <Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							name="email"
							value={form?.email || ''}
						/> -->
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Email</Form.Label>
									<Input {...props} type="email" bind:value={$formData.email} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<!-- <Label for="password">Password</Label>
						<Input id="password" type="password" name="password" value={form?.password || ''} /> -->
						<Form.Field {form} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Password</Form.Label>
									<Input {...props} type="password" bind:value={$formData.password} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<!-- <Label for="passwordConfirm">Password Confirmation</Label>
						<Input
							id="passwordConfirm"
							type="password"
							name="passwordConfirm"
							value={form?.passwordConfirm || ''}
						/> -->
						<Form.Field {form} name="passwordConfirm">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Password Confirmation</Form.Label>
									<Input {...props} type="password" bind:value={$formData.passwordConfirm} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<Form.Button class="w-full"
						>{#if $delayed}
							<Icon
								class="size-4 animate-spin"
								icon="icomoon-free:spinner9"
								color={'red'}
								height={20}
							/>
						{:else}
							Create an account
						{/if}</Form.Button
					>
				</div>
			</form>
			<form method="POST" action="/login/?/googleLogin">
				<Button type="submit" variant="outline" class="w-full mt-4">Login with Google</Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline"> Sign in </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
