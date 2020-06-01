import {
  ref,
  onMounted,
  onUnmounted,
  Ref,
} from 'vue';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | boolean;

function getVisibility() {
  if (typeof document === 'undefined') return true;
  return document.visibilityState;
}

export default function useDocumentVisibility(): Ref<VisibilityState> {
  const visibility = ref<VisibilityState>(getVisibility());
  const sync = () => {
    visibility.value = getVisibility();
  };
  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', sync)
    }
  })
  onUnmounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', sync);
    }
  })
  return visibility;
}
