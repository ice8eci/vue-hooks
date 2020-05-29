<template>
  <div class="demo-container">
    <h2>useInViewport</h2>
    <p>用于判断dom元素是否在视口可视范围之内的hook</p>
    <div class="demo">
      <h3>使用返回的elRef指定dom元素</h3>
      <div ref="dom1" class="targetDom" style="margin-bottom: 100px;">目标DOM1，使用elRef指定</div>
      <div
        class="isInViewport"
        :class="{'red-text': !dom1InViewport, 'primary-text': dom1InViewport}"
      >目标DOM1是否在视口显示范围内：{{ dom1InViewport ? '✅' : '❌'}}</div>
      <div id="targetDom">目标DOM2，使用返回HTML元素的函数指定</div>
      <div
        class="isInViewport"
        :class="{'red-text': !dom2InViewport, 'primary-text': dom2InViewport}"
      >目标DOM1是否在视口显示范围内：{{ dom2InViewport ? '✅' : '❌'}}</div>
    </div>
  </div>
</template>

<script>
import useInViewport from './index';

export default {
	name: 'useInViewport',
	setup() {
		const [dom1InViewport, dom1] = useInViewport();
		const [dom2InViewport] = useInViewport(() => document.getElementById('targetDom'));

		return {
			dom1InViewport,
			dom1,
			dom2InViewport,
		};
	},
};
</script>

<style scoped>
	.isInViewport {
		position: fixed;
		top: 10px;
		right: 20px;
    width: 50%;
    text-align: right;
	}
	.isInViewport:last-child {
		top: 40px;
	}
</style>
