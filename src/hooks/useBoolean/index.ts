import useToggle from '../useToggle';

const useBoolean = (defaultValue = false) => {
  const { state, toggle } = useToggle(defaultValue);

  const setTrue = () => {
    toggle(true);
  };

  const setFalse = () => {
    toggle(false);
  };

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useBoolean;
