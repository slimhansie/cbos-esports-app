<script>
  import "../app.postcss";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/">
          <strong class="text-xl uppercase">e-Sport manager</strong>
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a
          class="btn btn-sm variant-ghost-surface"
          href="/matches"
          rel="noreferrer"
        >
          Matches
        </a>
        <a
          class="btn btn-sm variant-ghost-surface"
          href="/teams"
          rel="noreferrer"
        >
          Teams
        </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
