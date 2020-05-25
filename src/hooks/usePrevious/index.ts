import {
  ref,
  Ref,
  watch,
  UnwrapRef,
} from 'vue';

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

export default <T = any>(state: Ref<T>, compare?: compareFunction<T>): Ref<T> => {
  const prevRef = ref();
  const currentRef = ref(state.value);

  watch([state], () => {
    const needUpdate = typeof compare === 'function' ? compare(prevRef.value, state.value) : true;
    if (needUpdate) {
      prevRef.value = currentRef.value;
      currentRef.value = state.value as UnwrapRef<T>;
    }
  });

  return prevRef;
};
