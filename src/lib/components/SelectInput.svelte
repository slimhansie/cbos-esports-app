<script>
  export let name;
  export let label;
  export let value;
  export let options = [];

  if (!value) {
    value = options[0]?.value;
  }
</script>

<label class="label">
  <span>{label}</span>
  <select {name} {label} class="select" {value}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</label>
