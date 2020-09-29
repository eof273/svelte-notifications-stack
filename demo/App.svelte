<script>
  import Notifications from '../src/Notifications/Notifications.svelte'
  import Page from "./Page.svelte";
</script>

<Notifications maxCount={5}>
    <Page/>
</Notifications>