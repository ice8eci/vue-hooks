import {
  ref,
  onUnmounted,
  Ref,
  watch,
} from 'vue';

interface ResponsiveConfig {
  [key: string]: number;
}
interface ResponsiveInfo {
  [key: string]: boolean;
}

const defaultResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

function useResponsive(): {
  info: Ref<ResponsiveInfo>,
  setResponsiveConfig: (newResponsiveConfig: ResponsiveConfig) => void,
  resetResponsiveConfig: () => void,
} {
  const info = ref<ResponsiveInfo>({} as ResponsiveInfo);
  const responsiveConfig = ref<ResponsiveConfig>(defaultResponsiveConfig);

  function calculate(info: Ref<ResponsiveInfo>): ResponsiveInfo | undefined {
    const width = window.innerWidth;
    const newInfo = {} as ResponsiveInfo;
    let shouldUpdate = false;
    for (let key in responsiveConfig.value) {
      newInfo[key] = width >= responsiveConfig.value[key];
      if (newInfo[key] != info.value[key]) {
        shouldUpdate = true;
      }
    }
    if (shouldUpdate) {
      info.value = newInfo;
      return newInfo;
    }
  }

  watch([responsiveConfig],() => {
    calculate(info);
  })
  calculate(info);
  const onResize = () => {
    calculate(info);
  };
  window.addEventListener('resize', onResize);
  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });
  return {
    info,
    setResponsiveConfig: (newConfig) => {
      responsiveConfig.value = newConfig;
    },
    resetResponsiveConfig: () => {
      responsiveConfig.value = defaultResponsiveConfig;
    }
  }
}

export default useResponsive;
