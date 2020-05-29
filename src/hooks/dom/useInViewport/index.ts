import {
  ref,
  onMounted,
  onUnmounted,
  Ref
} from 'vue';
import 'intersection-observer';

type Arg = HTMLElement | (() => HTMLElement) | null;
type isInViewport = boolean | undefined;

function getIsInViewport(el?: HTMLElement | null): boolean|undefined {
  if (!el) return;

  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const rect = el.getBoundingClientRect();

  if (rect) {
    const { top, bottom, right, left } = rect;
    return bottom > 0 && (top <= viewportHeight) && (right > 0) && (left <= viewportWidth);
  }
  return false;
}

function useInViewport<T extends HTMLElement = HTMLElement>(): [Ref<boolean|undefined>, Ref<T>];
function useInViewport<T extends HTMLElement = HTMLElement>(arg: Arg): [Ref<boolean|undefined>];
function useInViewport<T extends HTMLElement = HTMLElement>(
  ...args: [Arg] | []
): [Ref<boolean|undefined>, Ref<T|undefined>?] {
  const hasPassedInElement = args.length === 1;
  const passedElement = args[0];
  const elRef = ref<T>();
  let targetElement = getTargetElement();
  const isInViewport = ref<boolean|undefined>(targetElement ? getIsInViewport(targetElement as HTMLElement) : false);
  function getTargetElement() {
    if (hasPassedInElement) {
      return typeof passedElement === 'function' ? passedElement() : passedElement;
    }
    return elRef.value;
  }

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    targetElement = getTargetElement();
    if (!targetElement) return;
    isInViewport.value = getIsInViewport(targetElement);
    observer = new IntersectionObserver((entries) => {
      for(let entry of entries) {
        if (entry.isIntersecting) {
          isInViewport.value = true;
        } else {
          isInViewport.value = false;
        }
      }
    });
    observer.observe(targetElement);
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  })


  if (hasPassedInElement) {
    return [isInViewport];
  }
  return [isInViewport, elRef];
}

export default useInViewport;
