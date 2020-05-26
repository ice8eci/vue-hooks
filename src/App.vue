<template>
  <div id="app">
    <use-hover></use-hover>
    <use-session-storage-state></use-session-storage-state>
    <use-local-storage-state></use-local-storage-state>
    <use-history-travel-refactor></use-history-travel-refactor>
    <use-history-travel></use-history-travel>
    <use-previous></use-previous>
    <use-counter></use-counter>
    <use-throttle></use-throttle>
    <use-throttle-fn></use-throttle-fn>
    <use-debounce></use-debounce>
    <use-debounce-fn></use-debounce-fn>
    <use-boolean></use-boolean>
    <use-toggle></use-toggle>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import UseToggle from './hooks/useToggle/Demo.vue';
import UseBoolean from './hooks/useBoolean/Demo.vue';
import UseDebounceFn from './hooks/useDebounceFn/Demo.vue';
import UseDebounce from './hooks/useDebounce/Demo.vue';
import UseThrottleFn from './hooks/useThrottleFn/Demo.vue';
import UseThrottle from './hooks/useThrottle/Demo.vue';
import UseCounter from './hooks/useCounter/Demo.vue';
import UsePrevious from './hooks/usePrevious/Demo.vue';
import UseHistoryTravel from './hooks/useHistoryTravel/Demo.vue';
import UseHistoryTravelRefactor from './hooks/useHistoryTravel/DemoRefactor.vue';
import UseLocalStorageState from './hooks/useLocalStorageState/Demo.vue';
import UseSessionStorageState from './hooks/useSessionStorageState/Demo.vue';
import UseHover from './hooks/dom/useHover/Demo.vue';

export default {
  name: 'App',
  components: {
    UseHover,
    UseSessionStorageState,
    UseLocalStorageState,
    UseHistoryTravelRefactor,
    UseHistoryTravel,
    UsePrevious,
    UseCounter,
    UseThrottle,
    UseThrottleFn,
    UseDebounce,
    UseDebounceFn,
    UseBoolean,
    UseToggle,
  },
  setup() {
    const arr = reactive([1, 2, 3, 4]);
    const clear = () => {
      arr.length = 0;
    };
    const add = () => {
      arr.push(1);
    };
    return {
      arr,
      clear,
      add,
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
input[type="text"] {
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
button {
  background: #2CC7C5;
  color: #ffffff;
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
button:after {
  content: "";
  background: #47e1df;
  display: block;
  position: absolute;
  /* padding-top: 300%; */
  /* padding-left: 350%; */
  /* margin-left: -20px!important; */
  /* margin-top: -120%; */
  width: 100%;
  height:100%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.8s;
}
button:hover,button:focus {
  background: #27bab8;
  outline: 0;
}
button:active {
  background: #18adab;
}
button:disabled {
  background: #cccccc;
}
button:active:after {
  /* padding: 0; */
  /* margin: 0; */
  width: 0;
  height: 0;
  opacity: 1;
  transition: 0s;
}
button+button {
  margin-left: 10px;
}
.margin-top-10 {
  margin-top: 10px;
}
.checkbox-group {
  padding: 5px 0;
}
.checkbox-group label {
  display: inline-block;
}
.checkbox-group label+label {
  margin-left: 12px;
}
.checkbox-group label input {
  margin-left: 8px;
}
</style>
