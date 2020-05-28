import { ref, Ref, watch, onMounted, onUnmounted } from 'vue';
import screenfull from 'screenfull';
import useBoolean from '../../useBoolean';

interface Options<T> {
  dom?: T | (() => T) | null;
  onExitFull?: () => void;
  onFull?: () => void;
}

interface Result<T> {
  isFullscreen: Ref<boolean>;
  setFull: () => void;
  exitFull: () => void;
  toggleFull: () => void;
  refDom?: Ref<T | undefined>;
}

function useFullscreen<T extends HTMLElement = HTMLElement>(options?: Options<T>): Result<T> {
  const { dom, onExitFull, onFull } = options || {};
  const { state: isFullscreen, toggle, setTrue, setFalse } = useBoolean();
  const { state: syncState, setTrue: setSyncTrue, setFalse: setSyncFalse } = useBoolean();
  const refDom = ref();

  function getElement() {
    const passedInElement = typeof dom === 'function' ? dom() : dom;
    return passedInElement || refDom.value;
  }

  function syncStateFn() {
    if (screenfull.isEnabled) {
      const { isFullscreen: globalIsFullscreen } = screenfull;
      isFullscreen.value = globalIsFullscreen;
    }
  }

  watch([isFullscreen, syncState], () => {
    if (syncState.value) return;
    if (!screenfull.isEnabled) return;
    const targetElement = getElement();
    if (!targetElement) return;
    if (isFullscreen.value) {
      screenfull
        .request(targetElement)
        .then(() => {
          onFull && onFull();
        })
        .catch(error => {
          throw error;
        });
    } else {
      screenfull
        .exit()
        .then(() => {
          onExitFull && onExitFull();
        })
        .catch(error => {
          throw error;
        });
    }
  });

  onMounted(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', syncStateFn);
      setSyncTrue();
    }
  });

  onUnmounted(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', syncStateFn);
      setSyncTrue();
    }
  });

  const result: Result<T> = {
    isFullscreen,
    setFull: () => {
      setSyncFalse();
      setTrue();
    },
    exitFull: () => {
      setSyncFalse();
      setFalse();
    },
    toggleFull: () => {
      setSyncFalse();
      toggle();
    },
  };
  if (!dom) {
    result.refDom = refDom;
  }
  return result;
}

export default useFullscreen;
