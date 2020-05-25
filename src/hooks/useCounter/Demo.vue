<template>
  <div class="demo-container">
    <h2>useCounter</h2>
    <p>一个可以管理counter状态的Hook</p>
    <div>
      <h2>Demo</h2>
    </div>
    <div>
      <p>currentCount: {{count}} [max: 100, min: 0]</p>
      <button @click="inc()">inc()</button>
      <button @click="dec()">dec()</button>
      <button @click="set(101)">set(101)</button>
      <button @click="set(3)">set(3)</button>
      <button @click="set(-1)">set(-1)</button>
      <button @click="reset()">reset()</button>
    </div>
  </div>
</template>

<script lang="ts">
import useCounter from './index';

export default {
  name: 'useCounter',
  setup() {
    const {
      count,
      inc,
      dec,
      set,
      reset,
    } = useCounter(20, {
      max: 100,
      min: 0,
    });

    return {
      count,
      inc,
      dec,
      set,
      reset,
    };
  },
};
</script>

<style>

</style>
