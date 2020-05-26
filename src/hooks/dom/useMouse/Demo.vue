<template>
  <div class="demo-container">
    <h2>useMove</h2>
    <p>用于追踪鼠标位置的hook</p>
    <div class="demo">
      <h3>鼠标位置信息展示</h3>
      <ul>
        <li> 距离显示器左侧的距离：{{mouseInfo.screenX}}</li>
        <li> 距离显示器顶部的距离：{{mouseInfo.screenY}}</li>
        <li>距离当前视口左侧的距离：{{mouseInfo.clientX}}</li>
        <li>距离当前视口顶部的距离：{{mouseInfo.clientY}}</li>
        <li>距离整个页面左侧的距离：{{mouseInfo.pageX}}</li>
        <li>距离整个页面顶部的距离：{{mouseInfo.pageY}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import useMouse from './index';

export default {
  name: 'useMouse',
  setup() {
    const mouseInfo = useMouse();
    return {
      mouseInfo,
    }
  }
}
</script>

<style>

</style>
