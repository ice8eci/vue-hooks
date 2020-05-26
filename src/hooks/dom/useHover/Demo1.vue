<template>
  <div class="demo">
    <h3>基本用法</h3>
    <div>
      <div ref="hoverElement">{{isHover ? 'hover' : 'leaveHover'}}</div>
    </div>
  </div>
</template>

<script>
import useHover from './index';
export default {
	name: 'useHover Demo1',
	setup() {
		const { isHover, element: hoverElement } = useHover();
		return { isHover, hoverElement };
	},
};
</script>

<style>
</style>
