<template>
  <div class="demo">
    <h3>1.基本用法</h3>
    <div>
      <p>使用上/下按键修改count的值</p>
      <p class="text-indent-2em">1. 按“上”键，增加count的值</p>
      <p class="text-indent-2em">2. 按“下”键，减少count的值</p>
      <p>count = {{count}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useKeyPress, { aliasKeyMap, aliasKeyCodeMap } from './index';

export default {
  name: 'Demo1',
  setup() {
    const count = ref(0);
    useKeyPress(aliasKeyMap.up[0], () => {
      count.value = count.value + 1;
    })
    useKeyPress(aliasKeyCodeMap.down, () => {
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
