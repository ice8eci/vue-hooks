<template>
  <div class="demo">
    <h3>监听document滚动</h3>
    <p>{{JSON.stringify(scrollInfo)}}</p>
  </div>
</template>

<script>
import useScroll from './index';

export default {
  name: 'Demo2',
  setup() {
    const [scrollInfo] = useScroll(document);
    return {
      scrollInfo,
    }
  }
}
</script>

<style>

</style>
