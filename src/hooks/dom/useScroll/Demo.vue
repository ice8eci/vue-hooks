<template>
  <div class="demo-container">
    <h2>useScroll</h2>
    <p>跟踪滚动状态的hook</p>
    <demo1></demo1>
    <demo2></demo2>
  </div>
</template>

<script>
import Demo1 from './Demo1';
import Demo2 from './Demo2';
export default {
	name: 'useScroll',
	components: {
		Demo1,
		Demo2,
	},
	setup() {},
};
</script>

<style>
</style>
