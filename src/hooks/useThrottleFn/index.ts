import {
  watch,
  ref,
  Ref,
  onUnmounted,
} from 'vue';

type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

function useThrottleFn<T extends any[]>(fn: (...args: T) => any, wait: number): ReturnValue<T>;
function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: Ref[],
  wait: number,
): ReturnValue<T>;
function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: Ref[] | number,
  wait?: number,
): ReturnValue<T> {
  const _deps = Array.isArray(deps) ? deps : [];
  const _wait: number = typeof deps === 'number' ? deps : wait || 0;
  const timer = ref<any>();

  const fnRef = ref<noop>(fn);

  const currentArgs = ref<any>([]);

  const cancel = () => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = undefined;
  };

  const run = (...args: any) => {
    currentArgs.value = args;
    if (!timer.value) {
      timer.value = setTimeout(() => {
        fnRef.value(...currentArgs.value);
        timer.value = undefined;
      }, _wait);
    }
  };

  if (_deps.length !== 0) {
    watch([..._deps], () => {
      run();
    });
  }

  onUnmounted(() => {
    cancel();
  });
  return {
    run,
    cancel,
  };
}

export default useThrottleFn;
