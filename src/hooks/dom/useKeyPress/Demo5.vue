<template>
  <div class="demo">
    <h3>5.自定义DOM</h3>
    <div>
      <p>输入任意内容，并按下回车键：{{text}}</p>
      <input type="text" id="input" placeholder="请输入..." />
    </div>
    <div>
      <p>输入任意内容，并按下回车键：{{textRef}}</p>
      <input ref="inputRef" type="text" placeholder="请输入..." />
    </div>
    <div>
      <p>双向数据绑定：{{textSync}}</p>
      <input type="text" id="input2" placeholder="请输入..." />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useKeyPress from './index';

export default {
  name: 'Demo5',
  setup() {
    const text = ref('...');
    const textRef = ref('...');
    const textSync = ref('...');

    useKeyPress(
      'enter',
      event => {
        text.value = event.target.value;
      },
      {
        events: ['keyup'],
        target: () => document.getElementById('input')
      }
    )

    const inputRef = useKeyPress(
      'enter',
      event => {
        textRef.value = event.target.value;
      }
    )

    useKeyPress(
      () => true,
      event => {
        textSync.value = event.target.value;
      },
      {
        events: ['keyup'],
        target: () => document.getElementById('input2')
      }
    )


    return {
      text,
      textRef,
      textSync,
      inputRef,
    }
  }
}
</script>

<style>

</style>
