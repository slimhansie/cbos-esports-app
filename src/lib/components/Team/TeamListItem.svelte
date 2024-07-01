<script>
  import { createEventDispatcher } from "svelte";
  export let team_data;

  const dispatch = createEventDispatcher();

  function handle_delete() {
    dispatch("delete", { team_id: team_data.team_id });
  }
</script>

<div class="group w-full flex items-center space-x-5">
  <button class="btn variant-ringed-secondary">
    <span>{team_data.title}</span>
  </button>
  <div class="space-x-2">
    <a
      href="/teams/edit/{team_data.team_id}"
      class="btn-icon variant-filled group-hover:opacity-100 md:opacity-0"
    >
      <i class="fa fa-pen" />
    </a>
    <button
      on:click={handle_delete}
      class="btn-icon variant-ghost-primary group-hover:opacity-100 md:opacity-0"
    >
      <i class="fa fa-trash-can" />
    </button>
  </div>
</div>
