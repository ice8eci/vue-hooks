import { ref, onMounted, onUnmounted } from 'vue';

export interface CursorState {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

const initState: CursorState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
}

export default () => {
  const mouseInfo = ref<CursorState>(initState);

  const moveHandler = (event: MouseEvent) => {
    mouseInfo.value = {
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
    }
  }
  onMounted(() => {
    document.addEventListener('mousemove', moveHandler);
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', moveHandler)
  })
  return mouseInfo;
}
