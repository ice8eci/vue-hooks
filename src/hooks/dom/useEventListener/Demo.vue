<template>
  <div class="demo-container">
    <h2>useEventListener</h2>
    <p>优雅使用addEventListener的hook</p>
    <div class="demo">
      <h3>使用返回的ref绑定DOM元素</h3>
      <p>点击次数：{{ refDomClickCount }}</p>
      <button ref="refDom">点击</button>
    </div>
    <div class="demo">
      <h3>不传入dom元素，也不绑定ref,默认监听window</h3>
      <p>按下的键是：{{ pressKeyCode }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useEventListener from './index';

export default {
  name: 'useEventListener',
  setup() {
    const refDomClickCount = ref(0);
    const refDom = useEventListener('click', () => {
      refDomClickCount.value += 1;
    })
    const pressKeyCode = ref('');
    useEventListener('keydown', (event) => {
      pressKeyCode.value = event.key;
    });

    return {
      refDomClickCount,
      refDom,
      pressKeyCode,
    }
  }
}
</script>

<style>

</style>
