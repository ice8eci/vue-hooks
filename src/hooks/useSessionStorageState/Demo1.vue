<template>
  <div class="demo">
    <h3>持久化数据到本地</h3>
    <div>
      <input type="text" placholder="请输入..." v-model="inputValue" />
      <p>
        <button @click="reset()">重置</button>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import useSessionStorageState from './index';
export default {
  name: 'Demo1',
  setup() {
    const {
      state,
      setState,
    } = useSessionStorageState('some_ideas', 'changcheng~');
    const inputValue = ref(state.value || '');
    const reset = () => {
      setState();
      inputValue.value = state.value || '';
    };
    watch([inputValue], () => {
      setState(inputValue.value);
    })
    return {
      inputValue,
      reset,
    };
  },
};
</script>

<style>
</style>
