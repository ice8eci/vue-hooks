import { ref, onUnmounted, watch } from 'vue';


type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}


function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  wait: number,
): ReturnValue<T>;
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: any[],
  waith: number,
): ReturnValue<T>;
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: any[] | number,
  wait?: number,
): ReturnValue<T> {
  const _deps = Array.isArray(deps) ? deps : [];
  const _wait: number = typeof deps === 'number' ? deps : (wait || 0);
  const timer = ref<any>();
  const fnRef = ref<noop>(fn);

  const cancel = () => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
  };

  const run = (...args: any) => {
    cancel();
    timer.value = setTimeout(() => {
      fnRef.value(...args);
    }, _wait);
  };

  watch([..._deps], () => {
    run();
    return cancel;
  });

  onUnmounted(() => {
    cancel();
  });

  return {
    run,
    cancel,
  };
}

export default useDebounceFn;
