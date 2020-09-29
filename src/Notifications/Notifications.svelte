<script>
  import {setContext, onMount} from 'svelte'
  import {constants} from '..'
  import Notification from './../Notification/Notification.svelte'
  const {NOTIFICATIONS_POSITIONS, NOTIFICATIONS_TYPES, CONTEXT_NAME} = constants
  let notifications = [];
  let last = 0;
  let instance;
  export let maxCount = 5;
  export let position = NOTIFICATIONS_POSITIONS.BOTTOM_RIGHT

  const generateLastNote = () => {
    if (last > maxCount) {
      last = 0
    }
    last = last + 1
  }

  const add = ({message, component, componentProps, type, timeout, duration}) => {
    generateLastNote()
    const id = last
    const commonProps = {
      id,
      timeout,
      type,
      duration
    }
    let newNotifications = []
    if(component){
      newNotifications = [...notifications, {...commonProps, message: {component, componentProps: componentProps({id, last, timeout, duration})}}]
    }
    if(typeof message === "string"){
      newNotifications = [...notifications, {...commonProps, message}]
    }
    if(newNotifications.length > maxCount){
      newNotifications.shift()
    }
    notifications = newNotifications
  }

  const close = (id) => {
    notifications = notifications.filter(notification => notification.id !== id)
  }

  const updatePosition = (newPosition) => {
    position = newPosition
  }

  setContext(CONTEXT_NAME, {
    add,
    close,
    updatePosition,
    position,
    positions: NOTIFICATIONS_POSITIONS,
    types: NOTIFICATIONS_TYPES
  })

  onMount(() => {
    document.body.appendChild(instance);
    return () => {
      document.body.removeChild(instance);
    };
  })

</script>

<style>
    .notifications {
        position: fixed;
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .notifications_bottom_left {
        bottom: 20px;
        left: 20px;
    }

    .notifications_bottom_right {
        bottom: 20px;
        right: 20px;
    }

    .notifications_top_left {
        top: 20px;
        left: 20px;
    }

    .notifications_top_right {
        top: 20px;
        right: 20px;
    }

    .notifications_top_center {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }

    .notifications_bottom_center {
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>

<slot />
<div class="notifications notifications_{position}" bind:this={instance}>
    {#each notifications as {id, message, type, timeout, duration} (id)}
        <Notification {id} {message} {type} {timeout} {duration} {position}/>
    {/each}
</div>
