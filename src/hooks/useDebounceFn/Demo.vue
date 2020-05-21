<template>
  <div>
    <h2>useDebounceFn</h2>
    <p>用于处理防抖函数的Hook</p>
    <hr />
    <div class="demo">
      <h2>Demo 1</h2>
      <div>
        <p>Clicked count: {value}</p>
        <button @click="run">Click fast!</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import useDebounceFn from './index';

export default {
  name: 'useDebounceFn',
  setup() {
    const count = ref<number>(0);
    const { run } = useDebounceFn(() => {
      count.value += 1;
    }, 500);

    return {
      count,
      run,
    };
  },
};
</script>

<style>

</style>
