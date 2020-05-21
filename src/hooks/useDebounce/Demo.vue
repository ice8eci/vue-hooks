<template>
  <div class="demo-container">
    <h2>useDebounce</h2>
    <p>用来处理防抖值的Hook</p>
    <div class="demo">
      <h3>Demo</h3>
      <div>
        <input v-model="inputValue" type="text" placeholder="请输入..." />
        <p>DebouncedValue: {{ debouncedValue || "等待..."}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import useDebounce from './index';

export default {
  name: 'useDebounce',
  setup() {
    const inputValue = ref<string>('');
    const debouncedValue = useDebounce(inputValue, 1000);
    return {
      inputValue,
      debouncedValue,
    };
  },
};
</script>

<style>

</style>
