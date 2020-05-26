import { ref, onMounted, onUnmounted, computed, ComputedRef, Ref } from 'vue';
import useBoolean from '../../useBoolean';


export interface Options<T> {
  dom?: T | (() => T) | null;
  onEnter?: () => void;
  onLeave?: () => void;
}

export interface ReturnValue {
  isHover: ComputedRef<boolean | undefined>;
  element?: Ref<HTMLElement | null>;
}

export default <T extends HTMLElement = HTMLElement>(
  options?: Options<T>,
): ReturnValue => {
  const { dom, onEnter, onLeave } = options || {};
  const element = ref<HTMLElement|null>(null);
  const { state, setTrue, setFalse } = useBoolean(false);
  let applyDom: HTMLElement|null = null;

  const onMouseEnter = () => {
    if (onEnter) onEnter();
    setTrue();
  };

  const onMouseLeave = () => {
    if (onLeave) onLeave();
    setFalse();
  }

  onMounted(() => {
    const passedElement = typeof dom === 'function' ? dom() : dom;

    // 如果传入dom
    if (passedElement) {
      passedElement.addEventListener('mouseenter', onMouseEnter);
      passedElement.addEventListener('mouseleave', onMouseLeave);
      applyDom = passedElement;
    }

    const node = element.value;
    if (node) {
      node.addEventListener('mouseenter', onMouseEnter);
      node.addEventListener('mouseleave', onMouseLeave);
      applyDom = node;
    }
  })

  onUnmounted(() => {
    if (applyDom) {
      applyDom.removeEventListener('mouseenter', onMouseEnter);
      applyDom.removeEventListener('mouseleave', onMouseLeave);
    }
  })

  const isHover = computed<boolean>(() => !!state.value);
  if (dom) {
    return {
      isHover,
    }
  }
  return {
    isHover: isHover,
    element
  }
}
