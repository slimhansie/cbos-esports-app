<script>
  export let name;
  export let label;
  export let placeholder;
  export let value = "";
</script>

<label class="label">
  <span>{label}</span>
  <input {name} class="input" type="text" {placeholder} {value} />
</label>
