import { ref, Ref, onMounted, onUnmounted } from 'vue';

type ParamDom = HTMLElement | (() => HTMLElement) | null;

interface Rect {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SelectionInfo extends Rect {
  text: string;
}

const initRect: Rect = {
  width: NaN,
  height: NaN,
  top: NaN,
  bottom: NaN,
  left: NaN,
  right: NaN,
}

const initSelectionInfo: SelectionInfo = {
  ...initRect,
  text: '',
}

function getRectFromSelection(selection: Selection): Rect {
  if (!selection) return initRect;
  if (selection.rangeCount < 1) {
    return initRect;
  }
  const range = selection.getRangeAt(0);
  if (!range) return initRect;
  const {
    width,
    height,
    top,
    bottom,
    left,
    right,
  } = range.getBoundingClientRect();
  return {
    width,
    height,
    top,
    bottom,
    left,
    right
  }
}

const baseAPISupported = !!window.getSelection;

function useTextSelection<T extends HTMLElement = HTMLElement>():{ selectionInfo: Ref<SelectionInfo>, elRef: Ref<T|undefined> };
function useTextSelection<T extends HTMLElement = HTMLElement>(dom: ParamDom): { selectionInfo: Ref<SelectionInfo> };
function useTextSelection<T extends HTMLElement = HTMLElement>(
  ...args: [ParamDom] | []
): {
  selectionInfo: Ref<SelectionInfo>,
  elRef?: Ref<T|undefined>
} {
  const selectionInfo = ref<SelectionInfo>(initSelectionInfo);
  const elRef = ref<T>();
  if (baseAPISupported) {
    const hasPassedDOM = args.length === 1;
    const passedDOM = args[0];

    function getTargetElement() {
      if (hasPassedDOM) {
        return (typeof passedDOM === 'function' ? passedDOM() : passedDOM);
      }
      return elRef.value;
    }
    const resetSelectionInfo = () => {
      selectionInfo.value = initSelectionInfo;
    }

    const mouseDownHandler = () => {
      resetSelectionInfo();
      const selectionObj = window.getSelection();
      if (selectionObj) {
        selectionObj.removeAllRanges();
      }
    }

    const mouseUpHandler = () => {
      const selectionObj = window.getSelection();
      if (!selectionObj) return;
      const rect = getRectFromSelection(selectionObj);
      const text = selectionObj.toString() || '';
      if (text) {
        selectionInfo.value = {
          ...rect,
          text,
        }
      }
    }

    onMounted(() => {
      const targetElement = getTargetElement();
      if (!targetElement) return;
      targetElement.addEventListener('mouseup', mouseUpHandler);
      window.addEventListener('mousedown', mouseDownHandler);
    })
    onUnmounted(() => {
      const targetElement = getTargetElement();
      if (!targetElement) return;
      targetElement.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
    })
  }
  return {
    selectionInfo,
    elRef,
  }
}

export default useTextSelection;
