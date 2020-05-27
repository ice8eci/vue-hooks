import { ref, onMounted, onUnmounted, Ref } from 'vue';

// fix me 组合键的实现还有点问题

export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type keyType = KeyboardEvent['keyCode'] | KeyboardEvent['key'];
export type KeyFilter = keyType | Array<keyType> | ((event: KeyboardEvent) => boolean);
export type EventHandler = (event: KeyboardEvent) => void;
export type keyEvent = 'keydown' | 'keyup';
export type RefType = HTMLElement | (() => HTMLElement | null);
export type EventOption = {
  events?: Array<keyEvent>;
  target?: Window | RefType;
};
export type AliasMapValue =
  | number
  | string
  | Array<string | number>
  | ((event: KeyboardEvent) => boolean);
export interface AliasMap {
  [key: string]: AliasMapValue | undefined;
  esc?: AliasMapValue;
  tab?: AliasMapValue;
  enter?: AliasMapValue;
  space?: AliasMapValue;
  left?: AliasMapValue;
  up?: AliasMapValue;
  right?: AliasMapValue;
  down?: AliasMapValue;
  delete?: AliasMapValue;
  ctrl?: AliasMapValue;
  shift?: AliasMapValue;
  alt?: AliasMapValue;
  meta?: AliasMapValue;
}

// 键盘事件 keyCode 别名
export const aliasKeyCodeMap: AliasMap = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: [8, 46], // 8或者46
};

// 键盘事件key 别名
export const aliasKeyMap: AliasMap = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // IE11，键盘方向名称不带'Arrow'前缀
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  delete: ['Backspace', 'Delete'],
};

const OrientMap: any = {
  Up: 'ArrowUp',
  ArrowUp: 'Up',
  Left: 'ArrowLeft',
  ArrowLeft: 'Left',
  Right: 'ArrowRight',
  ArrowRight: 'Right',
  Down: 'ArrowDown',
  ArrowDown: 'Down',
};

// 修饰键 modifier
export const modifierKey: AliasMap = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,
};

const noop = () => {};

/**
 * 判断类型
 * @param obj
 * @returns String
 */
function isType(obj: any): string {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase();
}

/**
 * 判断是否为对应的按键激活
 * @param event
 * @param keyFilter
 */
function genFilterKey(event: KeyboardEvent, keyFilter: any): boolean {
  if (!event.key || !event.keyCode) return false;
  const type = isType(keyFilter);
  // 数字类型直接匹配事件的 keyCode
  if (type === 'number') {
    return event.keyCode === keyFilter;
  }

  // 字符串依次判断是否有组合键
  const genArr: string[] = keyFilter.split('.');
  let genLen = 0;
  for (const key of genArr) {
    // 组合键
    const genModifier = modifierKey[key];
    // key别名
    const aliasKey = aliasKeyMap[key];
    // keyCode别名
    const aliasKeyCode = aliasKeyCodeMap[key];
    // 判断规则
    // 1. 自定义组合键别名
    const isModifierKey = genModifier && (genModifier as Function)(event);
    // 2. 自定义key别名
    const isAliasKey =
      aliasKey && isType(aliasKey) === 'array'
        ? (aliasKey as Array<string>).includes(event.key)
        : aliasKey === event.key;
    // 3. 自定义keyCode别名
    const isAliasKeyCode =
      aliasKeyCode && isType(aliasKeyCode) === 'array'
        ? (aliasKeyCode as Array<number>).includes(event.keyCode)
        : aliasKeyCode === event.keyCode;
    // 4. 匹配key或keyCode
    const isKey =
      event.key.toUpperCase() === key.toUpperCase() ||
      event.key.toUpperCase() === (OrientMap[key] || '').toUpperCase();
    // 5. 如果key可以转化为数字，则匹配keyCode
    const isKeyCode = !Number.isNaN(Number(key)) && (Number(key) === event.keyCode);
    if (isModifierKey || isAliasKey || isAliasKeyCode || isKey || isKeyCode) {
      genLen++;
    }
  }
  return genLen === genArr.length;
}

function genKeyFormater(keyFilter: any): KeyPredicate {
  const type = isType(keyFilter);
  if (type === 'function') {
    return keyFilter;
  }
  if (type === 'string' || type === 'number') {
    return (event: KeyboardEvent) => genFilterKey(event, keyFilter);
  }
  if (type === 'array') {
    return (event: KeyboardEvent) => keyFilter.some((item: any) => genFilterKey(event, item));
  }
  return keyFilter ? () => true : () => false;
}

const defaultEvents: Array<keyEvent> = ['keydown'];

function useKeyPress<T extends HTMLElement = HTMLElement>(
  keyFilter: KeyFilter,
  eventHandler: EventHandler = noop,
  option: EventOption = {},
): Ref<T | undefined> {
  const { events = defaultEvents, target } = option;
  const element = ref<T>();
  const callbackHandler = (event: KeyboardEvent) => {
    const genGuard: KeyPredicate = genKeyFormater(keyFilter);
    if (genGuard(event)) {
      return eventHandler(event);
    }
  };
  let el: HTMLElement;
  onMounted(() => {
    const targetElement = isType(target) === 'function' ? (target as () => HTMLElement)() : target;
    el = (element.value || targetElement || window) as HTMLElement;
    for (const eventName of events) {
      el.addEventListener(eventName, callbackHandler);
    }
  });

  onUnmounted(() => {
    if (el) {
      for (const eventName of events) {
        el.removeEventListener(eventName, callbackHandler);
      }
    }
  });

  return element;
}

export default useKeyPress;
