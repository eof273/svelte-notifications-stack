<script>
    import {getContext} from "svelte";
    import {CONTEXT_NAME} from "../../src";

    export let id
    export let text
    const {close} = getContext(CONTEXT_NAME);
</script>

<style>
    .custom-notification {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #616161;
        color: #fff;
        border-radius: 5px;
        overflow: hidden;
    }
    .custom-notification-button {
        padding: 20px;
        background: #ffb642;
        cursor: pointer;
    }
    .custom-notification-text {
        padding: 0 20px;
    }
</style>

<div class="custom-notification">
    <div class="custom-notification-text">{text}</div>
    <div class="custom-notification-button" on:click={()=>close(id)}>close</div>
</div>