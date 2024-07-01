<script>
  import { goto } from "$app/navigation";
  import TextInput from "$lib/components/TextInput.svelte";

  export let data;

  const { title, team_id } = data.team;

  async function handle_submit() {
    let form_data = new FormData(this);
    let title = form_data.get("title");

    let res = await edit_team(title);
    if (res.status == 200) {
      goto("/teams");
    } else {
      //handle error
    }
  }

  function edit_team(title) {
    return fetch(`/api/teams/${team_id}`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  }
</script>

<div class="container h-full mx-auto flex justify-center">
  <div class="my-10 w-full space-y-5">
    <!-- Breadcrumbs -->
    <ol class="breadcrumb">
      <li class="crumb">
        <a class="anchor" href="/teams">Teams</a>
      </li>
      <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
      <li>Edit</li>
    </ol>
    <!-- Form -->
    <form on:submit={handle_submit} class="w-fit space-y-3">
      <TextInput name="title" label="Name" placeholder="Name" value={title} />
      <button type="submit" class="btn variant-filled-primary">Save</button>
    </form>
  </div>
</div>
