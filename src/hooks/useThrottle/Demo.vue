<template>
  <div class="demo-container">
    <h2>useThrottle</h2>
    <p>用来处理节流的Hook</p>
    <div class="demo">
      <h3>Demo</h3>
    </div>
    <div>
      <input type="text" v-model="inputValue" placeholder="请输入..." />
      <p>throttledValue: {{ throttledValue || "waiting..." }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import useThrottle from './index';

export default {
  name: 'useThrottle',
  setup() {
    const inputValue = ref<string>('');
    const throttledValue = useThrottle<string>(inputValue, 500);
    return {
      inputValue,
      throttledValue,
    };
  },
};
</script>

<style>

</style>
