<template>
  <div class="demo">
    <h3>2.使用别名</h3>
    <div>
      <p>使用左/右按键修改count的值</p>
      <p class="text-indent-2em">1. 按“左”键，减少count的值</p>
      <p class="text-indent-2em">2. 按“右”键，增加count的值</p>
      <p>count = {{count}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useKeyPress from './index';

export default {
  name: 'Demo2',
  setup() {
    const count = ref(0);
    useKeyPress('right', () => {
      count.value = count.value + 1;
    })
    useKeyPress('left', () => {
      count.value = count.value - 1;
    });
    return {
      count,
    }
  }
}
</script>

<style>

</style>
