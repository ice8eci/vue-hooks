<template>
  <div class="demo-container">
    <h2>useTextSelection</h2>
    <p>实时获取当前页面选中文字的内容和信息（位置，宽高等）</p>
    <div class="demo">
      <h3>基础应用</h3>
      <div>
        <p>用鼠标在页面上随意选择一段文字</p>
        <p>页面随意位置选中的内容信息：{{JSON.stringify(globalSelectionInfo)}}</p>
      </div>
    </div>
    <div class="demo">
      <h3>指定id</h3>
      <div>
        <p id="target-dom">用鼠标在指定的DOM上随意选择一段文字</p>
        <p>页面指定DOM中选中的内容信息：{{JSON.stringify(idDOMSelectionInfo)}}</p>
      </div>
    </div>
    <div class="demo">
      <h3>通过ref绑定</h3>
      <div>
        <p ref="refDOM">用鼠标在指定的DOM上随意选择一段文字</p>
        <p>页面指定DOM中选中的内容信息：{{JSON.stringify(refDOMSelectionInfo)}}</p>
      </div>
    </div>
    <div class="demo">
      <h3>选中释义</h3>
      <div>
        <p ref="selectedTranslate">Hello, my name is lili!</p>
        <p v-if="selectionInfo.text">{{selectionInfo.text}}: {{ mean || '没有查到' }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { watch, ref } from 'vue';
import useTextSelection from './index';
const means = {
  hello: '你好',
  my: '我的',
  name: '名字',
  is: '是',
}
export default {
	name: 'useTextSelection',
	setup() {
		const { selectionInfo: globalSelectionInfo } = useTextSelection(document);
		const { selectionInfo: idDOMSelectionInfo } = useTextSelection(() =>
			document.getElementById('target-dom'),
    );
    const {
      selectionInfo: refDOMSelectionInfo,
      elRef: refDOM
    } = useTextSelection();
    const {
      selectionInfo,
      elRef: selectedTranslate,
    } = useTextSelection();
    const mean = ref('');

    watch([selectionInfo], () => {
      console.log(selectionInfo.value.text, 'text');
      if (selectionInfo.value.text) {
        const nextMean = selectionInfo.value.text.replace(/\s*(\w*)[,\.]?\s*/g, function(_, word) {
          console.log(word,means[word], 'word');
          if (means[word]) return means[word];
          return word;
        })
        console.log(nextMean, 'nextMean');
        if (nextMean) {
          mean.value = nextMean;
        }
      } else {
        mean.value = '';
      }
    })

		return {
			globalSelectionInfo,
      idDOMSelectionInfo,
      refDOMSelectionInfo,
      refDOM,
      selectionInfo,
      selectedTranslate,
      mean,
		};
	},
};
</script>

<style>
</style>
