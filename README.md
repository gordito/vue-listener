# Vue JS Event Listner

Vue-Listener is an MVC Model Event Listener for VueJS. For all of you that want to use VueJS as a traditional MVC and skip the hassle of VueX and states. This is usually an issue when working with multiple sockets and API:s, streaming and updates >1000 events per second.

If your used to working with MVC and have a model you donät want to rewrite for a specific Vue application, this plugin will make your life a lot easier.

## Install and Use

To install just run:

```
npm i -s vue-listener
```

and use it on you model classes like this:

```
import VueListener from 'vue-listener'
class MyModel extends VueListener { }
```

## Example

Build your data model in Classes, expanding the vue-listener.

```
import VueListener from 'vue-listener';

class MyModel extends VueListener {
  constructor() {
    super();
    this.name = 'name';
    this.age = 4;
    this.jobs = [];
  }
}

export default MyModel;
```

Every Class expanding vue-listener gets a Listen() command. If you call it from a Vue Component, you link the value from the model, to the Component value, like this.

```
<template>
  <div>
    <h1>{{name}}</h1>
    <p>Age: {{age}}</p>
  </div>
</template>

<script>
import MyModel from './mymodel.js';
export default {
  data() {
    return {
      MyModel,
      name: 'default',
      age: 0,
    };
  },
  mounted() {
    this.Model.Listen(['name', 'age'], this);
  }
}
</script>
```

Now when you update the MyModel class, the Component is automatically updated.

**There is also an example on CodePen Example**

https://codepen.io/gordito/pen/yLJdrOm

## Support

The current version of Vue Listener supports first level values of `String`, `Number`, `Boolean` and `Array`.

## Methods

`Listen(names [Array of Strings], target [usually this], identifier = 'default')`

This is probably the only method you need to get started with vue-listener.

Call it from you Vue Components mounted function, passing an array of variables you want to connect to the model.

At the moment, you need to use the same name for the var in the model class and the component, but in future versions this will be more flexible.


`Forget(name [String], identifier = 'default')`

If you want to remove listeners for a variable, just call Forget with the name of the variable as a string.



`Say(name [String], force = false)`

This is triggered when you update a variable in your model. If you want to trigger an update of a variable manually, just call it. The `force` option is to trigger a `$forceUpdate()` on the component, sometimes used for more advanced objects.


## Roadmap

Feel free to contibute on the following roadmap with pull requests.

- Adding support for Vue Component methods to be triggered when a value is updated.
- Automated testing of functions and edge cases.
