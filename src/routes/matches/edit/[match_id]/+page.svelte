<script>
  import { goto } from "$app/navigation";
  import TextInput from "$lib/components/TextInput.svelte";
  import SelectInput from "$lib/components/SelectInput.svelte";
  import RoundsList from "$lib/components/Rounds/RoundsList.svelte";

  export let data;

  $: ({
    match,
    teams = [],
    outcomes = [],
    match_formats = [],
    round_formats = [],
    rounds = [],
  } = data);

  $: ({
    match_id,
    match_title,
    match_team1_id,
    match_team2_id,
    match_format_id,
    match_outcome_id,
    match_round_limit,
  } = match);

  $: team_options = teams.map((t) => {
    return {
      value: t.team_id,
      label: t.title,
    };
  });

  $: outcome_options = outcomes.map((t) => {
    return {
      value: t.outcome_id,
      label: t.title,
    };
  });

  $: match_format_options = match_formats.map((t) => {
    return {
      value: t.match_format_id,
      label: t.title,
    };
  });

  $: round_format_options = round_formats.map((t) => {
    return {
      value: t.round_format_id,
      label: t.title,
    };
  });

  async function handle_submit() {
    let form_data = new FormData(this);
    let title = form_data.get("title");
    let team1_id = form_data.get("team1");
    let team2_id = form_data.get("team2");
    let match_format_id = form_data.get("match_format");
    let outcome_id = form_data.get("outcome");

    let res = await edit_match({
      title,
      team1_id,
      team2_id,
      match_format_id,
      outcome_id,
    });

    if (res.status == 200) {
      goto("/matches");
    } else {
      //alert error
    }
  }

  function edit_match(match_data) {
    return fetch(`/api/matches/${match_id}`, {
      method: "POST",
      body: JSON.stringify(match_data),
    });
  }
</script>

<div class="container h-full mx-auto flex justify-center">
  <div class="my-10 w-full space-y-5">
    <!-- Breadcrumbs -->
    <ol class="breadcrumb">
      <li class="crumb">
        <a class="anchor" href="/matches">Matches</a>
      </li>
      <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
      <li>Edit</li>
    </ol>
    <div class="flex space-x-5">
      <!-- Form -->
      <form on:submit={handle_submit} class="w-fit space-y-3">
        <TextInput
          name="title"
          label="Title"
          placeholder="Title"
          value={match_title}
        />
        <SelectInput
          name="team1"
          label="Team 1"
          options={team_options}
          value={match_team1_id}
        />
        <SelectInput
          name="team2"
          label="Team 2"
          options={team_options}
          value={match_team2_id}
        />
        <SelectInput
          name="match_format"
          label="Format"
          options={match_format_options}
          value={match_format_id}
        />
        <SelectInput
          name="outcome"
          label="Outcome"
          options={outcome_options}
          value={match_outcome_id}
        />
        <button type="submit" class="btn variant-filled-primary">Save</button>
      </form>
      <div class="w-full">
        <span class="roboto-normal">Rounds</span>
        <RoundsList
          {match_id}
          {rounds}
          {outcome_options}
          {round_format_options}
          rounds_limit={match_round_limit}
        />
      </div>
    </div>
  </div>
</div>
