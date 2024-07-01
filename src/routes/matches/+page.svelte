<script>
  import { invalidateAll } from "$app/navigation";
  import MatchListItem from "$lib/components/Match/MatchListItem.svelte";
  export let data;

  $: ({ matches } = data);

  async function delete_match(e) {
    let { match_id } = e.detail;
    let res = await fetch(`/api/matches/${match_id}`, { method: "DELETE" });
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
        <a class="anchor" href="/matches">Matches</a>
      </li>
    </ol>
    <div class="space-y-2">
      <a href="/matches/create" class="btn variant-filled"> + Create </a>
      {#each matches as match}
        <MatchListItem match_data={match} on:delete={delete_match} />
      {/each}
    </div>
  </div>
</div>
