<template>
  <div id="app">
    <use-event-listener></use-event-listener>
    <use-in-viewport></use-in-viewport>
    <use-responsive></use-responsive>
    <use-fullscreen></use-fullscreen>
    <use-click-away></use-click-away>
    <use-key-press></use-key-press>
    <use-size></use-size>
    <use-scroll></use-scroll>
    <use-mouse></use-mouse>
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
import UseMouse from './hooks/dom/useMouse/Demo.vue';
import UseScroll from './hooks/dom/useScroll/Demo.vue';
import UseSize from './hooks/dom/useSize/Demo.vue';
import UseKeyPress from './hooks/dom/useKeyPress/Demo.vue';
import UseClickAway from './hooks/dom/useClickAway/Demo.vue';
import UseFullscreen from './hooks/dom/useFullscreen/Demo.vue';
import UseResponsive from './hooks/dom/useResponsive/Demo.vue';
import UseInViewport from './hooks/dom/useInViewport/Demo.vue';
import UseEventListener from './hooks/dom/useEventListener/Demo.vue';

export default {
  name: 'App',
  components: {
    UseEventListener,
    UseInViewport,
    UseResponsive,
    UseFullscreen,
    UseClickAway,
    UseKeyPress,
    UseSize,
    UseScroll,
    UseMouse,
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
  position: absolute;
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  background: rgba(255, 255, 255, .5);
  transition: all 1s;
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
button:hover:after {
  height: 100%;
  opacity: 0;
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
.text-indent-2em {
  text-indent: 2em;
}
.red-text {
  color: #D5051E;
}
.primary-text {
  color: #38A7A5;
}
</style>
