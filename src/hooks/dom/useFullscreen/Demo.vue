<template>
  <div class="demo-container">
    <h2>useFullscrren</h2>
    <p>用于处理dom全屏的hook</p>
    <div class="demo">
      <h3>基本用法</h3>
      <div ref="refDom">
        <p>全屏状态：{{ isFullscreen ? "全屏" : "非全屏"}}</p>
        <p>
          <button @click="setFull">全屏</button>
          <button @click="exitFull">退出全屏</button>
          <button @click="toggleFull">切换全屏</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useFullscreen from './index';
export default {
	name: 'useFullscreen',
	setup() {
    const { isFullscreen, setFull, exitFull, toggleFull, refDom } = useFullscreen();
		return {
			isFullscreen,
			setFull,
			exitFull,
			toggleFull,
			refDom,
		};
	},
};
</script>

<style>
</style>
