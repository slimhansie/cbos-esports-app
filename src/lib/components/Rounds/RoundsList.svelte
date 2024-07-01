<script>
  import { invalidateAll } from "$app/navigation";
  import RoundListItem from "./RoundListItem.svelte";
  import RoundForm from "./RoundForm.svelte";

  export let match_id;
  export let rounds;
  export let outcome_options;
  export let round_format_options;
  export let rounds_limit;

  let sidepanel_status = "list"; // list | create | edit

  function handle_toggle_add_round() {
    sidepanel_status = "create";
  }

  let edit_round_id;
  function handle_toggle_edit_round(e) {
    const { round_id } = e.detail;
    edit_round_id = round_id;
    sidepanel_status = "edit";
  }

  function handle_cancel() {
    sidepanel_status = "list";
  }

  async function create_round(e) {
    const { formData } = e.detail;
    const title = formData.get("title");
    const round_format_id = formData.get("round_format_id");
    const outcome_id = formData.get("outcome_id");

    let res = await fetch("/api/rounds", {
      method: "POST",
      body: JSON.stringify({ match_id, title, round_format_id, outcome_id }),
    });

    if (res.status == 200) {
      sidepanel_status = "list";
      invalidateAll();
    }
  }

  async function edit_round(e) {
    const { formData, round_id } = e.detail;
    const title = formData.get("title");
    const round_format_id = formData.get("round_format_id");
    const outcome_id = formData.get("outcome_id");

    let res = await fetch(`/api/rounds/${round_id}`, {
      method: "POST",
      body: JSON.stringify({ match_id, title, round_format_id, outcome_id }),
    });

    if (res.status == 200) {
      sidepanel_status = "list";
      invalidateAll();
    }
  }

  async function delete_round(e) {
    const { round_id } = e.detail;
    let res = await fetch(`/api/rounds/${round_id}`, {
      method: "DELETE",
    });

    if (res.status == 200) {
      sidepanel_status = "list";
      invalidateAll();
    }
  }
</script>

<div class="space-y-3">
  {#if sidepanel_status == "create"}
    <RoundForm
      {outcome_options}
      {round_format_options}
      submit_label="Add round"
      on:submit={create_round}
      on:cancel={handle_cancel}
    />
  {:else if sidepanel_status == "edit"}
    <RoundForm
      {outcome_options}
      {round_format_options}
      round={rounds.find((i) => i.round_id == edit_round_id)}
      submit_label="Save round"
      on:submit={edit_round}
      on:cancel={handle_cancel}
    />
  {:else if sidepanel_status == "list"}
    {#each rounds as round}
      <RoundListItem
        {round}
        on:delete={delete_round}
        on:edit={handle_toggle_edit_round}
      />
    {/each}
    {#if rounds.length < rounds_limit}
      <button
        on:click={handle_toggle_add_round}
        class="btn variant-ghost-primary">+ Add round</button
      >
    {/if}
  {/if}
</div>
