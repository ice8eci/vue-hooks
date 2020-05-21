import { ref, UnwrapRef, Ref } from 'vue';
import useDebounceFn from '../useDebounceFn';

function useDebounce<T>(value: Ref<T>, wait: number) {
  const state = ref<T>(value.value);
  useDebounceFn(
    () => {
      state.value = value.value as UnwrapRef<T>;
    },
    [value],
    wait,
  );

  return state;
}

export default useDebounce;
