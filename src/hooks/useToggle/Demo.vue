<template>
  <div>
    <h2>useToggle</h2>
    <p>用于在两个状态间切换的Hook</p>
    <hr />
    <div class="demo1">
      <h3>Demo 1</h3>
      <p>state: {{demo1State}}</p>
      <p>
        <button @click="demo1Toggle(undefined)">toggle</button>
        <button @click="demo1SetLeft">setFlase</button>
        <button @click="demo1SetRight">setTrue</button>
      </p>
    </div>
    <div class="demo2">
      <h3>Demo 2</h3>
      <p>state: {{demo2State}}</p>
      <p>
        <button @click="demo2Toggle(undefined)">toggle</button>
        <button @click="demo2SetLeft">setHello</button>
        <button @click="demo2SetRight">setWorld</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import useToggle from './index';

export default {
  name: 'useToggle',
  setup() {
    const {
      state: demo1State,
      toggle: demo1Toggle,
      setLeft: demo1SetLeft,
      setRight: demo1SetRight,
    } = useToggle();
    const {
      state: demo2State,
      toggle: demo2Toggle,
      setLeft: demo2SetLeft,
      setRight: demo2SetRight,
    } = useToggle('hello', 'world');
    return {
      demo1State,
      demo1Toggle,
      demo1SetLeft,
      demo1SetRight,
      demo2State,
      demo2Toggle,
      demo2SetLeft,
      demo2SetRight,
    };
  },
};
</script>

<style>

</style>
