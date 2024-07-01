<script>
  import MatchRoundResult from "./MatchRoundResult.svelte";

  export let match_data;
  export let rounds;
  export let match_outcomes;

  let is_display_rounds = false;

  const team1_score = match_outcomes.find((m) => m.outcome_id == 1)?.count;
  const team2_score = match_outcomes.find((m) => m.outcome_id == 2)?.count;

  const match_date = new Date(match_data.match_starting_time);

  const match_date_display = match_date.toLocaleString("default", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const match_time_display = match_date.toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function toggle_display_rounds() {
    is_display_rounds = !is_display_rounds;
  }
</script>

<div class="shadow-lg">
  <button
    on:click={toggle_display_rounds}
    class="py-4 px-5 w-full flex items-center justify-center bg-surface-500 shadow-sm hover:bg-surface-400 transition-colors duration-100"
  >
    <div class="mr-auto flex flex-1">
      <div class="flex flex-col items-center">
        <span class="roboto-regular text-sm text-surface-300"
          >{match_date_display}</span
        >
        <span class="roboto-regular text-sm text-surface-400"
          >{match_time_display}</span
        >
      </div>
    </div>
    <div class="flex items-center">
      <!-- Team 1 -->
      <div class="flex items-center space-x-3">
        <div class="roboto-regular text-xl">{match_data.team1_title}</div>
        <div class="w-8 aspect-square rounded-full bg-primary-500" />
      </div>
      <!-- Score -->
      <div class="mx-5">
        <span class="roboto-regular text-nowrap"
          >{team1_score ?? 0} - {team2_score ?? 0}</span
        >
      </div>
      <!-- Team 2 -->
      <div class="flex items-center space-x-3">
        <div class="w-8 aspect-square rounded-full bg-secondary-500" />
        <div class="roboto-regular text-xl">{match_data.team2_title}</div>
      </div>
    </div>
    <!-- Spacer -->
    <div class="ml-auto flex flex-1"></div>
  </button>
  <!-- Rounds -->
  {#if is_display_rounds}
    <div class="bg-surface-600 divide-y-2 divide-surface-500">
      {#each rounds ?? [] as round}
        <MatchRoundResult {round} {match_data} />
      {/each}
    </div>
  {/if}
</div>
