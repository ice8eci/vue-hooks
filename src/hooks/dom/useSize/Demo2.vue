<template>
  <div class="demo">
    <h3>传入返回dom节点的函数</h3>
    <div id="resize-target">
      <p>尝试改变浏览器窗口大小！</p>
      <p>节点尺寸：width="{{size.width}}px", height="{{size.height}}px"</p>
    </div>
  </div>
</template>

<script>
import useSize from './index';

export default {
  name: 'demo2',
  setup() {
    const [size] = useSize(() => document.getElementById('resize-target'));
    return {
      size,
    }
  }
}
</script>

<style>

</style>
