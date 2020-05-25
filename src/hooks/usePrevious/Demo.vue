<template>
  <div class="demo-container">
    <h2>usePrevious</h2>
    <p>保存上一次渲染状态的Hook</p>
    <div>
      <h3>Demo 1</h3>
      <div>
        <p>counter current value: {{count}}</p>
        <p>counter previous value: {{previous || 'waiting...'}}</p>
        <div>
          <button @click="inc">increase</button>
          <button @click="dec">decrease</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import usePrevious from './index';

export default {
  name: 'usePrevious',
  setup() {
    const count = ref(1);
    const previous = usePrevious(count);
    const inc = () => {
      count.value += 1;
    };
    const dec = () => {
      count.value -= 1;
    };
    return {
      count,
      previous,
      inc,
      dec,
    };
  },
};
</script>

<style>

</style>
