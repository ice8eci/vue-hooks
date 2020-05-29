<template>
  <div class="demo-container">
    <h2>useResponsive</h2>
    <p>获取响应式尺寸的hook</p>
    <div class="demo">
      <h3>默认响应式配置（xs=0,sm=576,md=768,lg=992,xl=1200,xxl=1600）</h3>
      <div class="demo">
        <p>拉动浏览器窗口，改变窗口大小～😊</p>
        <ul class="list">
          <li v-for="(value, key) in basicInfo" :key="key">
            <span class="description">{{ value ? "✅" : "❌"}}</span>
            <span class="item">{{key}}</span>
          </li>
        </ul>
      </div>
    </div>
    <p>
      <button @click="setConfig">修改配置</button>
      <button @click="resetConfig">重置配置</button>
    </p>
  </div>
</template>

<script>
import uesResponsive from './index';

export default {
  name: 'useResponsive',
  setup() {
    const {
      info: basicInfo,
      setResponsiveConfig,
      resetResponsiveConfig: resetConfig,
    } = uesResponsive();
    const setConfig = () => {
      setResponsiveConfig({
        small: 0,
        middle: 600,
        large: 1000,
      })
    }
    return {
      basicInfo,
      setConfig,
      resetConfig,
    }
  }
}
</script>

<style scoped>
  .list li {
    display: flex;
    align-content: center;
    align-items: center;
    list-style: none;
  }
  .list li .item {
    padding-left: 15px;
  }
</style>

