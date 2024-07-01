<script>
  import { invalidateAll } from "$app/navigation";
  import TeamListItem from "$lib/components/Team/TeamListItem.svelte";
  export let data;

  $: ({ teams } = data);

  async function delete_team(e) {
    let { team_id } = e.detail;
    let res = await fetch(`/api/teams/${team_id}`, { method: "DELETE" });
    if (res.status == 200) {
      invalidateAll();
    } else {
      //handle error
    }
  }
</script>

<div class="container h-full mx-auto flex justify-center">
  <div class="my-10 w-full space-y-5">
    <ol class="breadcrumb">
      <li class="crumb">
        <a class="anchor" href="/teams">Teams</a>
      </li>
    </ol>
    <div class="space-y-2">
      <a href="/teams/create" class="btn variant-filled"> + Create </a>
      {#each teams as team}
        <TeamListItem team_data={team} on:delete={delete_team} />
      {/each}
    </div>
  </div>
</div>
