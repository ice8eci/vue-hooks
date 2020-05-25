import { reactive, computed } from 'vue';

interface HistoryTravel<T> {
  stack: T[];
  cursor: number;
}
function useHistoryTravel<T>(initialValue?: T) {
  const history = reactive<HistoryTravel<T>>({
    stack: initialValue ? [initialValue] : [],
    cursor: initialValue ? 0 : -1,
  });

  const inStack = (value: T) => {
    history.stack.push(value);
    history.cursor = history.stack.length - 1;
  };

  const _backward = (step = 1) => {
    const { cursor } = history;
    if (cursor <= 0) return;
    let nextCursor = cursor + step;
    if (nextCursor <= 0) {
      nextCursor = 0;
    }
    history.cursor = nextCursor;
  };

  const _forward = (step = 1) => {
    const { cursor, stack } = history;
    if (cursor >= stack.length) return;
    let nextCursor = cursor + step;
    if (nextCursor >= stack.length - 1) {
      nextCursor = stack.length - 1;
    }
    history.cursor = nextCursor;
  };

  const go = (step: number) => {
    if (typeof step !== 'number' || step === 0) return;
    if (step > 0) {
      _forward(step);
      return;
    }
    _backward(step);
  };

  const value = computed<T>(() => history.stack[history.cursor]);
  const backwardLength = computed<number>(() => {
    const { cursor } = history;
    if (cursor <= 0) return 0;
    return (cursor + 1);
  });
  const forwardLength = computed<number>(() => {
    const { stack, cursor } = history;
    if (cursor >= stack.length - 1) return 0;
    return (stack.length - cursor - 1);
  });

  return {
    value,
    backwardLength,
    forwardLength,
    addState: inStack,
    goBackward: () => go(-1),
    goForward: () => go(1),
    go,
  };
}

export default useHistoryTravel;
