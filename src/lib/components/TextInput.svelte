<script>
  export let name;
  export let label;
  export let placeholder;
  export let value = "";
</script>

<label class="label">
  <span class="roboto-regular">{label}</span>
  <input
    {name}
    class="input roboto-regular"
    type="text"
    {placeholder}
    {value}
  />
</label>
