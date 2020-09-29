<script>
  import {Notifications} from 'svelte-notifications-stack'
  import Page from "./Page.svelte";
</script>

<Notifications maxCount={5}>
    <Page/>
</Notifications>