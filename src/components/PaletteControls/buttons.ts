import withTippy, { TippyPropsLite } from '../common/withTippy';
import Button from './Button';

const options: TippyPropsLite = {
  placement: 'right',
};

export const EraserButton = withTippy(Button, 'Eraser', options);

export const BackgroundButton = withTippy(
  Button,
  'Change background color',
  options,
);

export const ColorPickerButton = withTippy(
  Button,
  'Pick color from grid',
  options,
);

export const CustomColorButton = withTippy(
  Button,
  'Choose custom color',
  options,
);
