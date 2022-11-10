import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { ReactElement } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown, string>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;
