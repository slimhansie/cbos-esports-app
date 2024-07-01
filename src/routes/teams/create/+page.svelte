<script>
  import { goto } from "$app/navigation";
  import TextInput from "$lib/components/TextInput.svelte";

  let files;

  async function handle_submit() {
    let form_data = new FormData(this);
    let title = form_data.get("title");

    let res = await create_team(title);
    if (res.status == 200) {
      //handle success
      goto("/teams");
    } else {
      //alert error
    }
  }
  function create_team(title) {
    return fetch("/api/teams", {
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
      <li>Create</li>
    </ol>
    <!-- Form -->
    <form on:submit={handle_submit} class="w-fit space-y-3">
      <TextInput name="title" label="Name" placeholder="Name" />
      <button type="submit" class="btn variant-filled-primary">Submit</button>
    </form>
  </div>
</div>
