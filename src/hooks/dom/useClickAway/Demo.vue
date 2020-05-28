<template>
  <div class="demo-container">
    <h2>useClickAway</h2>
    <p>优雅管理目标元素之外点击事件的hook</p>
    <div class="demo">
      <button ref="buttonRef">点击</button>
      <p>点击非按钮的次数：{{clickCount1}}</p>
    </div>
    <div class="demo">
      <button id="button">点击</button>
      <p>点击非按钮的次数：{{clickCount2}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useClickAway from './index';

export default {
  name: 'useClickAway',
  setup() {
    const clickCount1 = ref(0);
    const clickCount2 = ref(0);
    const buttonRef = useClickAway(() => {
      clickCount1.value = clickCount1.value + 1;
    })
    useClickAway(() => {
      clickCount2.value = clickCount2.value + 1;
    }, () => document.getElementById('button'));
    return {
      clickCount1,
      clickCount2,
      buttonRef,
    }
  }
}
</script>

<style>

</style>
