# svelte-notifications-stack

Svelte component for displaying notifications in the application.

`npm install --save svelte-notifications-stack` or `yarn add svelte-notifications-stack`

## Usage:

To use notifications-stack, you need to wrap a component that will be used to display notifications. For example, it can be a component that sends data to the server and receives a response, and depending on the response, we can show a notification. Or, you can wrap the entire application and use the notification wherever you need it.

#### Default notifications:

Let's say this is your application - App.svelte:

```sveltehtml
<script>
  import {Notifications} from 'svelte-notifications-stack';
  import Header from './Header'
  import Pages from './Pages'
  import Footer from './Footer'
</script>
<Notifications maxCount={3}>
  <div>
    <Header />
    <Pages />
    <Footer />
  </div>
</Notifications>
```
And now we want to use basic notifications in our application in the Pages component - Pages.svelte:

```sveltehtml
<script>
  import {getContext} from 'svelte';
  const {add, types} = getContext('svelte-notifications-stack');
  const handleAddDefaultNotification = (type) => {
    add({message: 'Message', type})
  };
</script>

<div>
  Main page
  <button on:click={()=>handleAddDefaultNotification(types.INFO)}>
    Show info notification
  </button>
</div>
```

In this example, we take the notification context and use the add method to add the notification:

```sveltejs
const {add, types} = getContext('svelte-notifications-stack');
const handleAddDefaultNotification = (type) => {
  add({message: 'Message', type})
};
```

![Image basic notifications](https://i.ibb.co/wc0LYS5/Screenshot-2020-09-30-at-00-02-19.png)

#### Custom notifications:

Let's take the same application code as an example - App.svelte:

```sveltehtml
<script>
  import {Notifications} from 'svelte-notifications-stack';
  import Header from './Header'
  import Pages from './Pages'
  import Footer from './Footer'
</script>
<Notifications maxCount={3}>
  <div>
    <Header />
    <Pages />
    <Footer />
  </div>
</Notifications>
```

And let's create our custom notification:

```sveltehtml
<script>
  import {getContext} from 'svelte';
  import CustomComponent from './CustomComponent';

  const {add} = getContext('svelte-notifications-stack');

  const handleAddCustomNotification = () => {
    add({
      component: CustomComponent, 
      componentProps: ({id})=>({
        id, 
        text: 'Custom text'
      })
    })
  };
</script>
<div>
  Main page
  <button on:click={handleAddCustomNotification}>
    Show custom notification
  </button>
</div>
```
And in our CustomComponent we receive props witch we passed in `componentProps` callback:

```sveltehtml
<script>
  import {getContext} from "svelte";

  export let id
  export let text
  const {close} = getContext('svelte-notifications-stack');
</script>

<div>
    <div>{text}</div>
    <div on:click={()=>close(id)}>close</div>
</div>
```

As you can see, we get `id`, `text` witch we passed in `componentProps` callback, and now we can close custom notification with `close` method from the context `on:click={()=>close(id)}`

### Notifications.svelte props

| Property | Values                                                                                                                                                          |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| maxCount | default: `5`.<br>type: `number`                                                                                                                                       |
| position | default: `bottom_right`.<br><br>Place where notifications will be shown:  <br><br> type: `top_left`, `top_right`, `top_center`, `bottom_left`, `bottom_right`, `bottom_center` |

###Context methods and properties

| Property/Method | Arguments/Values                                                    |
|-----------------|---------------------------------------------------------------------|
| add             | `({  message, component, componentProps, type, timeout, duration})` |
| close           | `(id)`                                                              |
| updatePosition  | `(position)`                                                        |
| position        | Current position where notifications will be shown                  |
| positions       | Object with a list of positions                                     |
| types           | Object with a list of types                                         |

Method `add`, takes `{message, component, componentProps, type, timeout, duration}`

Table explaining properties in add argument:

| Option         | Value                                                                                  |
|----------------|----------------------------------------------------------------------------------------|
| message        | `string`                                                                               |
| component      | `SvelteComponent`                                                                      |
| componentProps | callback with params `({id: number, last: number, timeout: number, duration: number})` |
| type           | type of notification                                                                   |
| timeout        | timeout after which the notification will disappear                                    |
| duration       | appear transition duration                                                             |

Method `close` takes `id` for closing custom notification.

Method `updatePosition` for changing notifications appear position
