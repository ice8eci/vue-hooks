import {
  CacheInterface,
  keyInterface,
  cacheListener
} from './types';
import hash from './utils/hash';

export default class Cache implements CacheInterface {
  private __cache: Map<string, any>;
  private __listeners: cacheListener[];
  constructor(initialData: any = {}) {
    this.__cache = new Map(Object.entries(initialData));
    this.__listeners = [];
  }
  serializeKey(key: keyInterface): [string, any, string] {
    let args;

    if (typeof key === 'function') {
      try {
        key = key();
      } catch (error) {
        key = '';
      }
    }
    if (Array.isArray(key)) {
      args = key;
      key = hash(key);
    } else {
      key = String(key);
    }
    const errorKey = key ? `err@${key}` : '';
    return [key, args, errorKey];
  }

  get(key: keyInterface): any {
    const [_key] = this.serializeKey(key);
    return this.__cache.get(_key);
  }
  set(key: keyInterface, value: any, shouldNotify = true) {
    const [_key] = this.serializeKey(key);
    this.__cache.set(_key, value);
    if (shouldNotify) {
      // TODO: mutate
    }
    this.notify();
  }
  keys() {
    return Array.from(this.__cache.keys());
  }
  has(key: keyInterface): boolean {
    const [_key] = this.serializeKey(key);
    return this.__cache.has(_key);
  }
  delete(key: keyInterface, shouldNotify = true) {
    const [_key] = this.serializeKey(key);
    if (this.has(_key)) {
      this.__cache.delete(_key);
    }
    if (shouldNotify) {
      // TODO: mutate
    }
    this.notify();
  }
  clear(shouldNotify = true) {
    this.__cache.clear();
    this.notify();
  }
  private notify() {
    this.__listeners.forEach(listener => {
      listener();
    })
  }
  subscribe(listener: cacheListener): () => void {
    if (typeof listener !== 'function') {
      throw new Error('Excepted the listener to be a function!')
    }
    let isSubscribed = true;
    this.__listeners.push(listener);
    return () => {
      /** 使用闭包参数，防止重复调用 */
      if (!isSubscribed) return;
      isSubscribed = false;
      const index = this.__listeners.indexOf(listener);
      if (index > -1) {
        this.__listeners[index] = this.__listeners[this.__listeners.length - 1];
        this.__listeners.length--;
      }
    }
  }
}
