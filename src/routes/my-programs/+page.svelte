<script>
	let { data } = $props();
	let programs = data.programs;
</script>

<main>
	<h1>My Programs</h1>
	<ul>
		{#if !programs}
			<p>No programs found</p>
		{:else}
			{#each programs as program}
				<li>{program.title}</li>
				{#each program.weeks as week}
					<li>{week.title}</li>
					{#each week.days as day}
						<li>{day.title}</li>
						{#each day.daysToWorkouts as workout}
							<li>{workout.workout.title}</li>
							{#if workout.workout.exercises}
								{#each workout.workout.exercises as exercise}
									<li>{exercise}</li>
								{/each}
							{/if}
						{/each}
					{/each}
				{/each}
			{/each}
		{/if}
	</ul>
</main>
