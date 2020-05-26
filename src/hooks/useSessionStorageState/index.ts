import useStorageState, { StorageStateResult } from '../useStorageState';

function useSessionStorageState<T = undefined> (
  key: string
): StorageStateResult<T>
function useSessionStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): StorageStateResult<T>
function useSessionStorageState<T>(
  key: string,
  defaultValue?: T | (() => T),
): StorageStateResult<T> {
  return useStorageState(sessionStorage, key, defaultValue);
}

export default useSessionStorageState;
