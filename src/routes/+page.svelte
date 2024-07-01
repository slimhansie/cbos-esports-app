<script>
  import MatchResult from "$lib/components/Match/MatchResult.svelte";
  export let data;

  const { matches, rounds, match_outcomes } = data;
</script>

<div class="container h-full mx-auto flex justify-center">
  <div class="my-10 w-full space-y-5">
    {#if matches?.length > 0}
      {#each matches as match}
        <MatchResult
          match_data={match}
          match_outcomes={match_outcomes.filter(
            (m) => m.match_id == match.match_id
          )}
          rounds={rounds.filter((r) => r.match_id == match.match_id)}
        />
      {/each}
    {:else}
      <div class="w-full flex justify-center">
        <span class="roboto-regular text-lg text-surface-400"
          >No matches captured</span
        >
      </div>
    {/if}
  </div>
</div>
