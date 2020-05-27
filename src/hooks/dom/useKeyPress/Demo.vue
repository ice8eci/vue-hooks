<template>
  <div class="demo-container">
    <h2>useKeyPress</h2>
    <demo1></demo1>
    <demo2></demo2>
    <demo3></demo3>
    <demo4></demo4>
    <demo5></demo5>
  </div>
</template>

<script>
import Demo1 from './Demo1.vue';
import Demo2 from './Demo2.vue';
import Demo3 from './Demo3.vue';
import Demo4 from './Demo4.vue';
import Demo5 from './Demo5.vue';

export default {
  name: 'useKeyPress',
  components: {
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5
  },
  set() {}
}
</script>

<style>

</style>
