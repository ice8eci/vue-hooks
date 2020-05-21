import {
  ref,
  computed,
  Ref,
  UnwrapRef,
} from 'vue';

type IState = string | number | boolean | undefined;


function useToggle<T = boolean | undefined>(): {
  state: Ref<boolean>;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle<T = IState>(
  defaultValue: T,
): {
  state: Ref<T>;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): {
  state: Ref<T | U>;
  toggle: (value?: T | U) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R,
) {
  const state = ref<D|R>(defaultValue);
  // vs. react，vue自动生成依赖
  const reverseValueOrigin = computed(() => (
    reverseValue === undefined ? !defaultValue : reverseValue
  ));

  // 切换返回值
  const toggle = (value?: D | R) => {
    // 强制返回状态值，适用于点击操作
    if (value !== undefined) {
      state.value = (value as UnwrapRef<D|R>);
      return;
    }
    state.value = (
      state.value === defaultValue ? reverseValueOrigin.value : defaultValue
      ) as UnwrapRef<D|R>;
  };

  // 设置默认值
  const setLeft = () => {
    state.value = (defaultValue as UnwrapRef<D|R>);
  };

  // 设置取反值
  const setRight = () => {
    state.value = (reverseValueOrigin.value as UnwrapRef<D|R>);
  };

  return {
    state,
    toggle,
    setLeft,
    setRight,
  };
}


export default useToggle;
