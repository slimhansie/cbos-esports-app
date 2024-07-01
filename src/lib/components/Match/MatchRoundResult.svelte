<script>
  export let round_data;
  export let teams_data;

  let winning_team = "team1";

  let round_outcome = teams_data[winning_team].title + " Win";

  let round_date = new Date(round_data.starting_time);
  let round_time_display = round_date.toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<div class="py-3 flex w-full justify-center items-center">
  <div class="mr-auto flex flex-1">
    <div class="w-full flex flex-col items-center">
      <span class="roboto-regular text-sm text-surface-400"
        >{round_time_display}</span
      >
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="flex items-center space-x-2">
      <div class="w-8 aspect-square rounded-full bg-primary-300" />
      <span class="roboto-regular text-sm">
        {round_data.title}
      </span>
    </div>
    <div class="flex items-center space-x-1">
      <span class="roboto-regular">
        {round_outcome}
      </span>
    </div>
  </div>
  <!-- Spacer -->
  <div class="flex-1 ml-auto"></div>
</div>
