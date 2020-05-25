<template>
  <div class="demo-container">
    <h2>useHistoryTravel</h2>
    <p>优雅的管理状态变化历史，可以快速在历史中穿梭 - 前进/后退</p>
    <div class="demo">
      <h3>Demo</h3>
      <div>
        <input type="text" placeholder="请输入..." v-model="inputValue" />
        <p>
          <button :disabled="!inputValue" @click="add">Add TODO</button>
          <button @click="clear">Clear</button>
        </p>
        <div class="todo-list">
          <h3>TODO List</h3>
          <ul>
            <li v-for="item in todoLists" :key="item">{{item}}</li>
          </ul>
        </div>
        <div>
          <button :disabled="backwardLength <= 0" @click="goBackward()">undo</button>
          <button :disabled="forwardLength <= 0" @click="goFoward()">redo</button>
        </div>
        <div class="margin-top-10">
          <input type="number" v-model="step" placeholder="请输入数字..." />
          <p><button @click="go(step)">Go</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import useHistoryTravel from './index';

export default {
  name: 'useHistoryTravel',
  setup() {
    const inputValue = ref('');
    const step = ref(0);
    const {
      value,
      backwardLength,
      forwardLength,
      addState,
      goBackward,
      goFoward,
      go,
    } = useHistoryTravel<string[]>([]);

    const add = () => {
      addState([
        ...value.value,
        inputValue.value,
      ]);
      inputValue.value = '';
    };

    const clear = () => {
      addState([]);
    };

    return {
      inputValue,
      step,
      todoLists: value,
      backwardLength,
      forwardLength,
      goBackward,
      goFoward,
      add,
      go,
      clear,
    };
  },
};
</script>

<style>
</style>
