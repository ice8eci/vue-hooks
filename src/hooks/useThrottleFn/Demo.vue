<template>
  <div class="demo-container">
    <h2>useThrottleFn</h2>
    <p>用来处理函数节流的Hook</p>
    <div class="demo">
      <h3>Demo 1</h3>
      <div>
        <p>Click count: {{count}}</p>
        <button @click="run">Click fast!</button>
      </div>
    </div>
    <div class="demo">
      <h3>Demo 2</h3>
    </div>
    <div>
      <input type="text" placeholder="请输入..." v-model="inputValue" />
      <p>
        <button @click="cancel">Cancel Throttle</button>
      </p>
      <p>
        throttleValue: {{throttleValue}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import useThrottleFn from './index';

export default {
  name: 'useThrottle',
  setup() {
    /** demo1 */
    const count = ref<number>(0);
    const { run } = useThrottleFn(() => {
      count.value += 1;
    }, 500);

    /** demo2 */
    const inputValue = ref<string>('');
    const throttleValue = ref<string>('');

    const { cancel } = useThrottleFn(() => {
      throttleValue.value = inputValue.value;
    }, [inputValue], 1000);
    return {
      count,
      run,
      inputValue,
      throttleValue,
      cancel,
    };
  },
};
</script>

<style>

</style>
