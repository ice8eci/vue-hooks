import { ref, Ref, UnwrapRef } from 'vue';
import useThrottleFn from '../useThrottleFn';

function useThrottle<T>(value: Ref<T>, wait: number) {
  const state = ref<T>(value.value);
  useThrottleFn(() => {
    state.value = value.value as UnwrapRef<T>;
  }, [value], wait);
  return state;
}

export default useThrottle;
