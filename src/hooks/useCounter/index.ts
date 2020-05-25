import { ref, Ref } from 'vue';

export interface Options {
  max?: number;
  min?: number;
}

export interface ReturnValue {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
  count: Ref<number>;
}

function useCounter(
  initValue = 0,
  options: Options = {},
): ReturnValue {
  const { max, min } = options;
  let init = initValue;
  if (typeof max === 'number') {
    init = Math.min(max, initValue);
  } else if (typeof min === 'number') {
    init = Math.max(min, initValue);
  }

  const count = ref<number>(init);

  const set = (value: number | ((c: number) => number)): void => {
    let targetValue = typeof value === 'number' ? value : value(count.value);
    if (typeof max === 'number') {
      targetValue = Math.min(max, targetValue);
    }
    if (typeof min === 'number') {
      targetValue = Math.max(min, targetValue);
    }
    count.value = targetValue;
  };

  const inc = (delta = 1) => set(count.value + delta);
  const dec = (delta = 1) => set(count.value - delta);
  const reset = () => set(init);

  return {
    count,
    inc,
    dec,
    set,
    reset,
  };
}

export default useCounter;
