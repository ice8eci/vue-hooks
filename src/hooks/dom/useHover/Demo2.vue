<template>
  <div class="demo">
    <h3>传入function或者dom来监听任意的dom节点</h3>
    <div id="hover-div">{{isHover ? "hover" : "leaveHover"}}</div>
  </div>
</template>

<script>
import useHover from './index';
export default {
  name: 'useHover Demo2',
  setup() {
    const { isHover } = useHover({
      dom: () => document.getElementById('hover-div'),
      onEnter: () => {
        console.log('onEnter');
      },
      onLeave: () => {
        console.log('onLeave');
      }
    });
    return {
      isHover,
    }
  }
}
</script>

<style>

</style>
