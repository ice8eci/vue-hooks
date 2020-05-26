import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  Ref,
} from 'vue';
import ResizeObserver from 'resize-observer-polyfill';

type Arg = HTMLElement | (() => HTMLElement) | null;
type Size = { width?: number; height?: number };

function useSize<T extends HTMLElement = HTMLElement>():[Size, Ref<T|undefined>];
function useSize<T extends HTMLElement = HTMLElement>(arg: Arg): [Size];
function useSize<T extends HTMLElement = HTMLElement>(
  ...args: [Arg] | []
): [Size, Ref<T|undefined>?] {
  const hasPassedInElement = args.length === 1;
  const dom = args[0];
  const element = ref<T>();

  const size = reactive<Size>({
    width: undefined,
    height: undefined,
  });

  let resizeObserver: ResizeObserver|null = null;
  onMounted(() => {
    const initDOM = typeof dom === 'function' ? dom() : dom;
    const targetElement = hasPassedInElement ? initDOM : element.value;
    if (!targetElement) return;

    resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        size.width = entry.target.clientWidth;
        size.height = entry.target.clientHeight;
      })
    });

    resizeObserver.observe(targetElement as Element);
  })
  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  })

  if (hasPassedInElement) {
    return [size];
  }
  return [size, element];
}

export default useSize;
