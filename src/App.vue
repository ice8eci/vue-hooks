<template>
  <div id="app">
    <use-boolean></use-boolean>
    <use-toggle></use-toggle>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import UseToggle from './hooks/useToggle/Demo.vue';
import UseBoolean from './hooks/useBoolean/Demo.vue';

export default {
  name: 'App',
  components: {
    UseToggle,
    UseBoolean,
  },
  setup() {
    const count = ref(0);
    const increase = () => {
      count.value += 1;
    };
    const decrease = () => {
      count.value += 1;
    };
    return {
      count,
      increase,
      decrease,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
