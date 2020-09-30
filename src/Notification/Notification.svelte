<script>
    import {getContext, onMount} from 'svelte'
    import { fly } from 'svelte/transition';
    import {constants} from '..'
    import {generateFlyTransition} from '../utils/notificationUtils'
    const {NOTIFICATIONS_TYPES, CONTEXT_NAME} = constants
    export let message
    export let id = 0;
    export let type = NOTIFICATIONS_TYPES.INFO
    export let timeout = null
    export let duration = 300
    export let position
    let currentTimeout = null
    let transition
    const {close} = getContext(CONTEXT_NAME)
    const handleClose = () => {
      close(id)
    }

    $: transition = generateFlyTransition(position, duration)

    onMount(()=>{
      if(timeout) {
        currentTimeout = setTimeout(()=>{
          handleClose()
        }, timeout)
      }
      return () => {
        clearTimeout(currentTimeout)
      }
    })
</script>

<style>
    .notification {
        display: flex;
        align-items: center;
        border-radius: 10px;
        justify-content: space-between;
        margin-top: 20px;
    }

    .notification:first-child {
        margin-top: 0;
    }

    .notification svg {
        width: 30px;
        height: 30px;
    }

    .notification_close {
        cursor: pointer;
        padding: 20px;
    }

    .notification svg path {
        fill: #fff;
    }
    .notification_info {
        background: #1d8bff;
    }
    .notification_warning {
        background: #ffb642;
    }
    .notification_error {
        background: #ff5246;
    }
    .notification_success {
        background: #4fad38;
    }
    .notification_message {
        color: #fff;
        padding: 20px 0 20px 20px;
        word-break: break-word;
        line-height: 20px;
        max-width: 320px;
    }
</style>

{#if typeof message === "string"}
    <div transition:fly="{transition}" class="notification notification_{type}">
        <div class="notification_message">{message}</div>
        <div class="notification_close" on:click={handleClose}>
            <svg
                    height="512px"
                    viewBox="0 0 512 512"
                    width="512px"
            >
                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
            </svg>
        </div>
    </div>
{:else}
    <div transition:fly="{transition}" class="notification">
        <svelte:component this={message.component} {...message.componentProps}/>
    </div>
{/if}
