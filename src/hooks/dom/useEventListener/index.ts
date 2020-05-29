import { ref, Ref, onMounted, onUnmounted } from 'vue';

type Target = HTMLElement | Window;
type DOMOption = Target | (() => Target) | null;
interface Options {
  dom?: DOMOption;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

function useEventListener<T extends Target = Target>(
  eventName: string,
  hanlder: Function,
  options: { capture?: boolean, once?: boolean, passive?: boolean }
):Ref<T|undefined>;

function useEventListener<T extends Target = Target>(
  eventName: string,
  handler: Function,
  options: { dom?: DOMOption, capture?: boolean, once?: boolean, passive?: boolean }
): void;

function useEventListener<T extends Target = Target>(
  eventName: string,
  handler: Function,
  options?: Options
) {
  const elRef = ref<T>();
  const { dom, ...otherOptions } = options || {};
  function getTargetElement() {
    if (dom) {
      return (typeof dom === 'function' ? dom() : dom);
    }
    return elRef.value || window;
  }
  let eventListener: ((event: Event) => EventListenerOrEventListenerObject | AddEventListenerOptions) | null = null;

  onMounted(() => {
    const targetElement = getTargetElement();
    if (!targetElement) return;
    const isSupported = window.addEventListener;
    if (!isSupported) return;
    eventListener = event => handler(event);
    targetElement.addEventListener(eventName, eventListener, otherOptions);
  })

  onUnmounted(() => {
    const targetElement = getTargetElement();
    if (targetElement && eventListener) {
      targetElement.removeEventListener(eventName, eventListener);
    }
  })

  if (!dom) {
    return elRef;
  }
}

export default useEventListener;
