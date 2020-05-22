<template>
  <div id="app">
    <use-throttle></use-throttle>
    <use-throttle-fn></use-throttle-fn>
    <use-debounce></use-debounce>
    <use-debounce-fn></use-debounce-fn>
    <use-boolean></use-boolean>
    <use-toggle></use-toggle>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import UseToggle from './hooks/useToggle/Demo.vue';
import UseBoolean from './hooks/useBoolean/Demo.vue';
import UseDebounceFn from './hooks/useDebounceFn/Demo.vue';
import UseDebounce from './hooks/useDebounce/Demo.vue';
import UseThrottleFn from './hooks/useThrottleFn/Demo.vue';
import UseThrottle from './hooks/useThrottle/Demo.vue';

export default {
  name: 'App',
  components: {
    UseToggle,
    UseBoolean,
    UseDebounceFn,
    UseDebounce,
    UseThrottleFn,
    UseThrottle,
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
}
.demo-container {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 5px 5px 1px #eeeeee;
}
input {
  width: 300px;
  border: 1px solid #eeeeee;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding: 0 5px;
  box-shadow: none;
  outline: none;
  background: #fafafa;
  border-radius: 4px;
}
input:focus {
  border-color: #2CC7C5;
}
</style>
