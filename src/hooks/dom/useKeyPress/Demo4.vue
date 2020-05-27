<template>
  <div class="demo">
    <h3>4.进阶使用，传入keyFilter和events</h3>
    <div>
      <p>请按下任意非数字键:{{key}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useKeyPress from './index';

export default {
  name: 'Demo4',
  setup() {
    const key = ref(0);
    const filterKey = ['0','1','2','3','4','5','6','7','8','9']
    useKeyPress(
      event => !filterKey.includes(event.key),
      event => {
        if (event.type === 'keyup') {
          key.value = event.key;
        }
      },
      {
        events: ['keyup', 'keydown'],
      }
    );
    return {
      key
    }
  }
}
</script>

<style>

</style>
