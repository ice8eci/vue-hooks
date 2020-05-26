<template>
  <div class="demo">
    <h3>setState支持函数的格式</h3>
    <div>
      <input type="text" placeholder="请输入姓名" v-model="name" />
      <div>
        <p>个人信息</p>
        <ul>
          <li v-for="(info, key) in person" :key="key">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import useSessionStorageState from './index';

export default {
  name: 'Demo 3',
  setup() {
    const {
      state,
      setState,
    } = useSessionStorageState('personal-info', {
      name: '李黎',
      age: 28,
      gender: 'female',
    });
    const name = ref(state.value.name || '');
    watch([name], () => {
      setState((previousState) => ({
        ...previousState,
        name,
      }));
    })

    return {
      name,
      person: state,
    }
  }
}
</script>

<style>

</style>
