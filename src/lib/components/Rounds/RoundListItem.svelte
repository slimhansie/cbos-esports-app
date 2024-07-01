<script>
  import { createEventDispatcher } from "svelte";
  export let round;

  const { round_id } = round;

  const dispatch = createEventDispatcher();

  function handle_delete() {
    dispatch("delete", { round_id });
  }

  function handle_edit() {
    dispatch("edit", { round_id });
  }
</script>

<div
  class="group px-4 py-3 flex w-full items-center bg-surface-700 hover:bg-surface-600"
>
  <div class="flex items-center space-x-6">
    <div class="flex items-center space-x-4">
      <span class="roboto-regular">
        {round.team1_title} <span class="text-surface-400">vs</span>
        {round.team2_title}</span
      >
    </div>
    <span>- {round.round_format_title} -</span>
    <span>{round.outcome_title}</span>
  </div>
  <div class="flex ml-auto space-x-2">
    <button
      on:click={handle_edit}
      class="btn-icon variant-filled group-hover:opacity-100 md:opacity-0"
    >
      <i class="fa fa-pen" />
    </button>
    <button
      on:click={handle_delete}
      class="btn-icon variant-ghost-primary group-hover:opacity-100 md:opacity-0"
    >
      <i class="fa fa-trash-can" />
    </button>
  </div>
</div>
