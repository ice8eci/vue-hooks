import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  Ref,
  UnwrapRef,
} from 'vue';

interface Position {
  left: number;
  top: number;
}

type Target = HTMLElement | Document;

type Arg = Target | (() => Target) | null;

function useScroll<T extends Target = HTMLElement>(): [Position, Ref<T>];
function useScroll<T extends Target = HTMLElement>(arg: Arg): [Position];
function useScroll<T extends Target = HTMLElement>(...args: [Arg] | []) {
  const position = reactive<Position>({
    left: NaN,
    top: NaN,
  });
  const element = ref<T>();
  const hasPassedInElement = args.length === 1;
  const dom = args[0];

  const passedInElement = typeof dom === 'function' ? dom() : dom;
  let applyElement: any = null;

  function updatePosition(target: Target) {
    let newLeft, newTop;
    if (target === document) {
      if (!document.scrollingElement) return;
      newLeft = document.scrollingElement.scrollLeft;
      newTop = document.scrollingElement.scrollTop;
    } else {
      newLeft = (target as HTMLElement).scrollLeft;
      newTop = (target as HTMLElement).scrollTop;
    }
    position.left = newLeft;
    position.top = newTop;
  }

  function listener(event: Event) {
    if (!event.target) return;
    updatePosition(event.target as Target);
  }

  onMounted(() => {
    applyElement = hasPassedInElement ? passedInElement : element.value;
    if (!applyElement) return;
    updatePosition(applyElement);
    applyElement.addEventListener('scroll', listener);
  })
  onUnmounted(() => {
    if (!applyElement) return;
    applyElement.removeEventListener('scroll', listener);
  })

  return [position, element];
}


export default useScroll;
