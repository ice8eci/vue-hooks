<template>
  <div class="demo-container">
    <h2>useDebounceFn</h2>
    <p>用于处理防抖函数的Hook</p>
    <hr />
    <div class="demo">
      <h2>Demo 1</h2>
      <div>
        <p>Clicked count: {{count}}</p>
        <button @click="run">Click fast!</button>
      </div>
    </div>
    <div class="demo">
      <h2>Demo 2</h2>
      <div>
        <input v-model="inputValue" type="text" placeholder="请输入..." />
        <p style="margin: '16px 0'">
          <button @click="cancel()">Cancel Debounce</button>
        </p>
        <p>DebouncedValue: {{ debouncedValue || "waiting..." }}</p>
        <p>WatchValue: {{ watchValue || "waiting..." }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import useDebounceFn from './index';

export default {
  name: 'useDebounceFn',
  setup() {
    /** demo1 */
    const count = ref<number>(0);
    const { run } = useDebounceFn(() => {
      count.value += 1;
    }, 500);

    /** demo2 */
    const inputValue = ref<string>('');
    const debouncedValue = ref<string>('');
    const watchValue = ref<string>('');

    watch([inputValue], () => {
      watchValue.value = inputValue.value;
    });

    const { cancel } = useDebounceFn(() => {
      debouncedValue.value = inputValue.value;
    }, [inputValue], 1000);

    return {
      count,
      run,
      inputValue,
      debouncedValue,
      watchValue,
      cancel,
    };
  },
};
</script>

<style>

</style>
