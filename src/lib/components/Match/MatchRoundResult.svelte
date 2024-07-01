<script>
  export let round;

  let round_outcome = round.outcome_title;

  let round_date = new Date(round.starting_time);
  let round_time_display = round_date.toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<div class="py-3 px-11 flex w-full justify-center items-center">
  <div class="mr-auto flex flex-1">
    <span class="roboto-regular text-sm text-surface-400"
      >{round_time_display}</span
    >
  </div>
  <div class="flex flex-col items-center space-y-1">
    <div class="flex items-center space-x-2">
      {#if round.outcome_id == 1}
        <div class="w-5 aspect-square rounded-full bg-primary-500" />
      {:else if round.outcome_id == 2}
        <div class="w-5 aspect-square rounded-full bg-secondary-500" />
      {/if}
      <span class="roboto-regular text-sm">
        {round.title}
      </span>
    </div>
    <div class="flex items-center space-x-1">
      <span class="roboto-regular">
        {round_outcome}
      </span>
    </div>
  </div>
  <!-- Spacer -->
  <div class="flex flex-1 ml-auto">
    <span class="ml-auto roboto-regular text-sm text-surface-400">
      {round.round_format_title}
    </span>
  </div>
</div>
