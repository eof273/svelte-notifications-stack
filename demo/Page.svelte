<script>
  import {getContext} from "svelte";
  import {constants} from "svelte-notifications-stack";
  import CustomNotification from "./CustomNotification/CustomNotification.svelte";

  const {CONTEXT_NAME} = constants

  const {add, updatePosition, positions, types} = getContext(CONTEXT_NAME);
  let notificationsPositions = [
    positions.BOTTOM_LEFT,
    positions.BOTTOM_CENTER,
    positions.BOTTOM_RIGHT,
    positions.TOP_CENTER,
    positions.TOP_LEFT,
    positions.TOP_RIGHT
  ]
  let notificationsTypes = [
    types.INFO,
    types.SUCCESS,
    types.ERROR,
    types.WARNING
  ]

  let text = ''

  const handleChangePosition = (pos) => {
    updatePosition(pos)
  }

  const handleAddNotification = (type) => {
    add({message: text, type})
  }
  const handleAddCustomNotification = () => {
    add({component: CustomNotification, componentProps: ({id})=>({id, text})})
  }

</script>

<style>
 .page button {
     padding: 10px;
     margin-right: 10px;
     background: #616161;
     border: none;
     border-radius: 8px;
     color: #fff;
     cursor: pointer;
     transition: transform 0.3s ease-in-out;
 }
 .position-buttons button:active {
     transform: scale(0.8);
 }
 .page h2 {
     margin-bottom: 20px;
 }

 .page > div {
     margin: 20px 0;
 }
 .page .button_info {
     background: #1d8bff;
 }
 .page .button_warning {
     background: #ffb642;
 }
 .page .button_error {
     background: #ff5246;
 }
 .page .button_success {
     background: #4fad38;
 }
 .notification-text input {
     padding: 10px;
     border: none;
     border-radius: 8px;
     background: #cecece;
 }
</style>


<div class="page">
    <h2>Notifications text</h2>
    <div class="notification-text">
        <input bind:value={text} placeholder="Set notification text"/>
    </div>
    <h2>Select position</h2>
    <div>
        {#each notificationsPositions as position}
            <button on:click={()=>handleChangePosition(position)}>{position}</button>
        {/each}
    </div>
    <h2>Add default notification</h2>
    <div>
        {#each notificationsTypes as type}
            <button class="button_{type}" on:click={()=>handleAddNotification(type)}>{type}</button>
        {/each}
    </div>
    <h2>Add custom notification</h2>
    <div>
        <button on:click={handleAddCustomNotification}>Add custom notification</button>
    </div>
</div>