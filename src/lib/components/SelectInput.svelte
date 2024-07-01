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
  <span class="roboto-regular">{label}</span>
  <select {name} {label} class="select" {value}>
    {#each options as option}
      <option class="roboto-regular" value={option.value}>{option.label}</option
      >
    {/each}
  </select>
</label>
