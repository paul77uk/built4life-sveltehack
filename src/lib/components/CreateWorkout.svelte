<script lang="ts">
	import { Button } from './ui/button';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from '../../routes/my-workouts/schema';
	import * as AlertDialog from './ui/alert-dialog';
	import { Textarea } from './ui/textarea';
	import { toast } from 'svelte-sonner';

	const { data } = $props<{ data: SuperValidated<Infer<FormSchema>> }>();

	let isOpen = $state(false);

	const form = superForm(data, {
		id: 'createWorkout',
		validators: zodClient(formSchema),

		onSubmit: () => {
			isOpen = false;
		},

		onUpdated(event) {
			if (event.form.valid) {
				console.log('Form is valid');
				isOpen = false;
				toast.success('Workout created successfully');
			} else {
				console.log('Form is invalid');
			}
		}
	});

	const { form: formData, enhance, formId } = form;
</script>

<div class="mt-6">
	<AlertDialog.Root bind:open={isOpen}>
		<AlertDialog.Trigger
			><Button onclick={() => (isOpen = true)}>Create Workout</Button></AlertDialog.Trigger
		>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Create Workout</AlertDialog.Title>
				<AlertDialog.Description>
					<form method="POST" action="?/createWorkout">
						<Form.Field {form} name="title">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Title</Form.Label>
									<Input {...props} bind:value={$formData.title} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="description">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Description</Form.Label>
									<Input {...props} bind:value={$formData.description} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- <Button onclick={() => exercisesArray.push(exercisesArray.length)}
							>Add Exercise</Button
						> -->

						<Form.Field {form} name="exercises">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Exercises</Form.Label>
									<Textarea {...props} bind:value={$formData.exercises} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="repsPr">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>PR</Form.Label>
									<Input type={'number'} {...props} bind:value={$formData.repsPr} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="timePr">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Time PR</Form.Label>
									<Input type="time" {...props} bind:value={$formData.timePr} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="minutes">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Minutes</Form.Label>
									<Input type={'number'} {...props} bind:value={$formData.minutes} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="seconds">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Seconds</Form.Label>
									<Input type={'number'} {...props} bind:value={$formData.seconds} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Button type="submit" class="w-full">Submit</Form.Button>
					</form>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
