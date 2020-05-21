<template>
  <div class="demo-container">
    <h2>useBoolean</h2>
    <p>优雅的管理boolean值的hook</p>
    <hr />
    <div class="demo">
      <h2>Demo</h2>
      <p>state: {{state}}</p>
      <div>
        <button @click="toggle(undefined)">toggle</button>
        <button @click="setTrue">setTrue</button>
        <button @click="setFalse">setFalse</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useBoolean from './index';

export default {
  name: 'useBoolean',
  setup() {
    const {
      state,
      toggle,
      setTrue,
      setFalse,
    } = useBoolean();
    return {
      state,
      toggle,
      setTrue,
      setFalse,
    };
  },
};
</script>

<style>

</style>
