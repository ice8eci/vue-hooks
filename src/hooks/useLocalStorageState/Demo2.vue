<template>
  <div class="demo">
    <h3>自动处理序列化和反序列化</h3>
    <div class="checkbox-group">
      <label
        v-for="checkboxItem in checkboxGroup"
        :for="checkboxItem.value"
        :key="checkboxItem.value"
      >
        <input
          :id="checkboxItem.value"
          type="checkbox"
          :value="checkboxItem.value"
          v-model="cities"
        />
        {{ checkboxItem.label }}
      </label>
    </div>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue';
import useLocalStorageState from './index';
export default {
	name: 'Demo2',
	setup() {
		const checkboxGroup = [
			{ label: '北京', value: 'bj' },
			{ label: '上海', value: 'sh' },
			{ label: '广州', value: 'gz' },
			{ label: '深圳', value: 'sz' },
			{ label: '合肥', value: 'hf' },
    ];
    const {
      state,
      setState,
    } = useLocalStorageState('local-cities', []);
    const cities = ref(state.value || []);

    watch([cities], () => {
      setState(cities.value);
    })

		return {
			checkboxGroup,
      cities,
		};
	},
};
</script>

<style>
</style>
