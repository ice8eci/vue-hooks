<template>
  <div class="demo-container">
    <h2>useDocumentVisibility</h2>
    <p>获取当前页面显示/隐藏状态的hook</p>
    <div class="demo">
      <p>当前documentVisibilityState: {{ visibilityState }}</p>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue';
import useDocumentVisibility from './index';

export default {
  name: 'useDocumentVisibility',
  setup() {
    const visibilityState = useDocumentVisibility();
    watch([visibilityState], () => {
      console.log(`current document visibility state is ${visibilityState.value}`);
    })
    return {
      visibilityState,
    }
  }
}
</script>

<style>

</style>
