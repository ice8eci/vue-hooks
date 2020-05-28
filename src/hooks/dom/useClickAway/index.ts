import { ref, Ref, onMounted, onUnmounted } from 'vue';

// 鼠标点击时间，不会监听右键
const defaultEvent = 'click';

type EventType = MouseEvent | TouchEvent;
type RefType = HTMLElement | (() => HTMLElement) | null;

export default function useClickAwary<T extends HTMLElement = HTMLElement>(
  onClickAway: (event: EventType) => any,
  dom?: RefType,
  eventName: string = defaultEvent,
): Ref<T|undefined> {
  const element = ref<T>();
  const handler = (event: any) => {
    const targetElement = typeof dom === 'function' ? dom() : dom;
    const el = targetElement || element.value;
    if (!el || el.contains(event.target)) return;
    onClickAway(event);
  }
  onMounted(() => {
    document.addEventListener(eventName, handler);
  })
  onUnmounted(() => {
    document.removeEventListener(eventName, handler);
  })
  return element;
}
