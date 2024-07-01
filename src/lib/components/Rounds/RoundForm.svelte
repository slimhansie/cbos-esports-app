<script>
  import { createEventDispatcher } from "svelte";
  import SelectInput from "$lib/components/SelectInput.svelte";
  import TextInput from "$lib/components/TextInput.svelte";

  export let outcome_options;
  export let round_format_options;
  export let round = {};
  export let submit_label;

  const dispatch = createEventDispatcher();

  function handle_submit() {
    const formData = new FormData(this);
    dispatch("submit", { formData, round_id: round.round_id });
  }

  function handle_cancel() {
    dispatch("cancel");
  }
</script>

<form on:submit={handle_submit} class="w-fit space-y-3">
  <TextInput
    name="title"
    label="Title"
    placeholder="Title"
    value={round?.round_title}
  />
  <SelectInput
    name="round_format_id"
    label="Format"
    options={round_format_options}
    value={round?.round_format_id}
  />
  <SelectInput
    name="outcome_id"
    label="Outcome"
    options={outcome_options}
    value={round?.outcome_id}
  />
  <div class="flex w-full">
    <button type="submit" class="btn variant-filled-primary"
      >{submit_label}</button
    >
    <button
      on:click={handle_cancel}
      type="button"
      class="ml-auto btn variant-ghost">Cancel</button
    >
  </div>
</form>
