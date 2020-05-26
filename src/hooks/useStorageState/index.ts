import {
  ref,
  Ref,
  UnwrapRef,
} from 'vue';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}

export type StorageStateDefaultValue<T> = T | IFuncUpdater<T>;
export interface StorageStateResult<T> {
  state: Ref<UnwrapRef<T> | undefined>;
  setState(value: StorageStateDefaultValue<T>): void;
}

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

function useStorageState<T>(
  storage: Storage,
  key: string,
  defaultValue?: StorageStateDefaultValue<T>
): StorageStateResult<T> {
  const state = ref<T | undefined>(getStoredValue());

  function getStoredValue() {
    const raw = storage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
    if (isFunction<IFuncUpdater<T>>(defaultValue)) {
      return defaultValue();
    }
    return defaultValue;
  }

  function updateState(value?: T | IFuncUpdater<T>) {
    if (typeof value === 'undefined') {
      storage.removeItem(key);
      state.value = undefined;
    } else if (isFunction<IFuncUpdater<T>>(value)) {
      const previousState = getStoredValue();
      const currentState = value(previousState);
      storage.setItem(key, JSON.stringify(currentState));
      state.value = currentState as UnwrapRef<T>;
    } else {
      storage.setItem(key, JSON.stringify(value));
      state.value = value as UnwrapRef<T>;
    }
  }

  return {
    state,
    setState: updateState,
  }
}

export default useStorageState;
