import {
  ref,
  reactive,
  Ref,
  UnwrapRef,
  computed,
  ComputedRef,
} from 'vue';

interface ReturnValue<T> {
  value: Ref<UnwrapRef<T|undefined>>;
  backwardLength: ComputedRef<number>;
  forwardLength: ComputedRef<number>;
  addState: (value: T) => void;
  goBackward: () => void;
  goForward: () => void;
  go: (step?: number) => void;
}

function currentIndex(step: number, targetArr: any[]): number {
  let index = step > 0 ? (step - 1) : (targetArr.length + step);
  if (index >= targetArr.length - 1) {
    index = targetArr.length - 1;
  }
  if (index < 0) {
    index = 0;
  }
  return index;
}

function useHistoryTravel<T>(initialValue?: T): ReturnValue<T> {
  const present = ref<T|undefined>(initialValue);
  const past = reactive<(UnwrapRef<T>|undefined)[]>([]);
  const future = reactive<(UnwrapRef<T>|undefined)[]>([]);
  const backwardLength = computed(() => past.length);
  const forwardLength = computed(() => future.length);

  const updatePresent = (value: T) => {
    past.push(present.value);
    future.length = 0;
    present.value = value as UnwrapRef<T|undefined>;
  };

  const _backward = (step = -1) => {
    if (backwardLength.value <= 0) return;
    const index = currentIndex(step, past);
    present.value = past[index];
    const _after = past.splice(index, past.length - index);
    future.unshift(..._after);
  };

  const _forward = (step = 1) => {
    if (forwardLength.value <= 0) return;
    const index = currentIndex(step, future);
    present.value = future[index];
    const _before = future.splice(0, index + 1);
    past.push(..._before);
  };

  const go = (step = 1) => {
    if (typeof step !== 'number' || (step === 0)) return;
    if (step > 0) {
      _forward(step);
      return;
    }
    _backward(step);
  };
  return {
    value: present,
    backwardLength,
    forwardLength,
    addState: updatePresent,
    goBackward: () => {
      go(-1);
    },
    goForward: () => {
      go(1);
    },
    go,
  };
}

export default useHistoryTravel;
