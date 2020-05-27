<template>
  <div class="demo">
    <h3>3.支持接收一组键入键，或者以组合的方式传递参数</h3>
    <p>
      <i>请注意：组合键的方式只支持修饰键 + 键位别名 + 键盘事件中的key进行组合</i>
    </p>
    <div>
      <p>尝试按下下面指定的键：</p>
      <p>
        1. 数字键[0,9]:
        <span class="red-text">{{num}}</span>
      </p>
      <p>
        2. 按键[a,s,d,f, Backspace, 8]:
        <span class="red-text">{{key}}</span>
      </p>
      <p>
        3. 修饰键[shift.c]:
        <input :checked="state === 1" disabled type="checkbox" />
      </p>
      <p>
        4. 修饰键[meta]:
        <input :checked="state === 2" disabled type="checkbox" />
      </p>
      <p>
        5. 修饰键[ctrl.alt.67(c)]:
        <input :checked="state === 3" disabled type="checkbox" />
      </p>
      <p>
        6. 修饰键[space]:
        <input :checked="state === 4" disabled type="checkbox" />
      </p>
      <p>
        7. 修饰键[ctrl.alt.0]:
        <input :checked="state === 5" disabled type="checkbox" />
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useKeyPress from './index';

export default {
	name: 'Demo3',
	setup() {
		const num = ref();
		const key = ref();
		const state = ref();
		const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

		useKeyPress(filterKey, event => {
			num.value = event.key;
		});

		// a s d f Backspace 8
		useKeyPress([65, 83, 68, 70, 8, '8'], event => {
			key.value = event.key;
		});

		useKeyPress(['shift.c'], event => {
			state.value = 1;
		});

		useKeyPress('meta', () => {
			state.value = 2;
		});

		useKeyPress('ctrl.alt.67', () => {
			state.value = 3;
    });

    useKeyPress('space', (event) => {
      console.log(event);
      state.value = 4;
    })

		useKeyPress('ctrl.alt.0', () => {
			state.value = 5;
		});

		return {
			num,
			key,
			state,
		};
	},
};
</script>

<style>
</style>
