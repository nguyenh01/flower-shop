import { useState } from 'react';

const useBooleanState = (state = false) => {
  const [visible, setVisible] = useState(state);

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  return { visible, toggle };
};

export default useBooleanState;
