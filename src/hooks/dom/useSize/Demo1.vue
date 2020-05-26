<template>
  <div class="demo">
    <h3>监听节点尺寸变化</h3>

    <p>节点尺寸：width="{{size.width}}px", height="{{size.height}}px"</p>
    <button @click="addWidth">增加宽度</button>
    <button @click="addHeight">增加高度</button>
    <div
      ref="ref"
      class="sizeTarget"
      :style="newStyle"
    >
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
      <p>世界这么大，怎么会只有这点空间！！！！</p>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import useSize from './index';
import { getNumberValuefromStyle } from '../../../utils';

export default {
	name: 'demo1',
	setup() {
    const [size, ref] = useSize();
    const newStyle = reactive({
      width: '100px',
      height: '100px',
    })
    const addWidth = () => {
      newStyle.width = `${20 + getNumberValuefromStyle(newStyle.width)}px`;
    }
    const addHeight = () => {
      newStyle.height = `${15 + getNumberValuefromStyle(newStyle.height)}px`;
    }
		return {
			size,
      ref,
      newStyle,
      addWidth,
      addHeight,
		};
	},
};
</script>

<style scoped>
	.sizeTarget {
		width: 100px;
		height: 100px;
		box-shadow: 0px 1px 10px 1px #eeeeee;
		margin: 20px 0;
		overflow: hidden;
	}
</style>

